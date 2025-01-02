import mongoose from 'mongoose';

const mongo_url = "mongodb://127.0.0.1:27017/session-auth";

export const connectDB = async () =>  {
    try {``
        await mongoose.connect(mongo_url);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}