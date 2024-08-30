import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongo_url = process.env.MONGO_URL;
        await mongoose.connect(mongo_url);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;