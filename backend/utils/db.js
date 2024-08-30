import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongo_url = "mongodb+srv://mahith:Mahi1234@cluster0.owguk.mongodb.net/data";
        await mongoose.connect(mongo_url);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;