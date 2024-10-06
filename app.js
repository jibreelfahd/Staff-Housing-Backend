/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import 'express-async-errors'
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors('*'));

//IMPORTS
import connectDB from "./src/db/index.js";
import staffRoutes from './src/routes/staff/staffRoutes.js';
import adminRoutes from './src/routes/admin/adminRoutes.js';
import errorHandlerMiddleware from "./src/middlewares/errorHandlerMiddleware.js";

//CONNECTING TO DATABASE AND LISTENING FOR SERVER ON PORT 8080 
const PORT = process.env.PORT || 9090;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
  });
}

start();

//ROUTING
app.use('/staff', staffRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandlerMiddleware);
