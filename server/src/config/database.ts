import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection failed. Running without database:', (error as Error).message);
    console.log('To use MongoDB: Install and start MongoDB or use MongoDB Atlas');
  }
};

export default connectDB;