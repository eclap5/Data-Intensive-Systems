import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
    try {
        const uri = "mongodb://localhost:27017/library_management";
        
        mongoose.Promise = Promise;
        await mongoose.connect(uri);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(`Error while connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

export default connectMongoDB;