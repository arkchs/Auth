import mongoose from 'mongoose';


export async function connectDB(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/session-auth");
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.log(`Could not connect to MongoDB ${err.message}`);
        process.exit(1);
    }
}