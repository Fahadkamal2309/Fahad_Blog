import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); 

import express from 'express';
import dotenv from 'dotenv';
console.log("MONGO_URL:", process.env.MONGO_URL ? "OK" : "MISSING");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "OK" : "MISSING");
import cors from 'cors';
import bodyParser from 'body-parser';

// components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

// ✅ FIXED CORS (ONLY THIS ONE)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/file', express.static('uploads'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Router);

const PORT = 8000;

Connection();

app.listen(PORT, () => 
    console.log(`Server is running successfully on PORT ${PORT}`)
);