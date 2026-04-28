import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/token.js";

dotenv.config();

const LoginUser = async (req, res) => {
    try {
        console.log(" LOGIN API HIT");
        console.log(" DATA:", req.body);

        const { username, password } = req.body;

        // 🔍 1. Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "User does not match"
            });
        }

        // 🔐 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Password does not match"
            });
        }

        // 🔑 3. Generate tokens
        const accessToken = jwt.sign(
            user.toJSON(),
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            user.toJSON(),
            process.env.REFRESH_SECRET_KEY
        );

        console.log("Before saving token");

        // 💾 4. Save refresh token in DB
        const newToken = new Token({ token: refreshToken });
        await newToken.save();

        console.log("Token saved successfully");

        // ✅ 5. Send response
        return res.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username
        });

    } catch (error) {
    console.log("LOGIN ERROR:", error);  // 👈 ADD THIS
    return res.status(500).json({
        message: error.message
    });
}
};
const SignupUser = async (req, res) => {
   

    try {
        console.log(" DATA RECEIVED:", req.body);
         const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { username: req.body.username, name: req.body.name, password: hashedPassword }

        const newUser = new User(user);

        console.log(" Before save");

        await newUser.save();

        console.log(" After save");

        return res.status(200).json({
            message: "User created successfully"
        });

    } catch (error) {
        console.log(" ERROR:", error);
        return res.status(500).json({
            message: "Error creating user"
        });
    }
};

export  { SignupUser, LoginUser };