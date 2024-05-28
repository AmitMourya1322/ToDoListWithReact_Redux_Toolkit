import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from '../backend/router/userRoutes.js'
import listRoutes from './router/listRoutes.js'
import cors from 'cors'
dotenv.config();
const app = express();

connectDB()
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // replace with your frontend URL
    credentials: true
  }));
app.use('/api/users', userRoutes);
app.use('/api/list',listRoutes)

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})