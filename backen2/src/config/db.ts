import mongoose from 'mongoose'
import 'dotenv/config'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB