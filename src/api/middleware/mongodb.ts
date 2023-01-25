const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch (err: any) {
    console.log(err.message);
  }
};
export { connectDB, disconnectDB };
