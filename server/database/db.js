import mongoose  from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    try {
        const URL = process.env.DB_URL;

        if (!URL) {
            console.log(" DB_URL is missing in .env file");
            return;
        }

        await mongoose.connect(URL);

        console.log("Database connected successfully");

    } catch (error) {
        console.log(" Error while connecting with the database:", error.message);
    }
};

export default Connection;