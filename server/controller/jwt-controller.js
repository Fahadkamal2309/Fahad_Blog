import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const authenticateToken = (request,response,next)=>{
    const authHeader = request.headers['authorization'];
    console.log("AUTH HEADER:", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("TOKEN RECEIVED:", token);
    if(token==null){
        return response.status(401).json({message:"token not found"});
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
        if(error){
            console.log("JWT ERROR:", error);
            return response.status(403).json({message:"invalid token"});
        }
        request.user=user;
        next();
    })
}