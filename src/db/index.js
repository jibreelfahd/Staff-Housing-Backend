import mongoose from "mongoose";

const connectDB = async (dbURI) => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to Database Successfully");
  } catch (err) {
    console.error("Error from connecting to DB", err);
  }
};

export default connectDB;
