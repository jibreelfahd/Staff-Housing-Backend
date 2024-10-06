/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config()

import connectDB from '../index.js';
import Houses from "../../models/houses/houses.js";
import houses from './houses.json' assert { type: 'json'};

const insertHouses = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Houses.deleteMany();
    await Houses.create(houses);
    console.log('Sucess');
    process.exit(0);
  } catch (err) {
    console.log('Error from seed', err);
    process.exit(1)
  }
}

insertHouses();