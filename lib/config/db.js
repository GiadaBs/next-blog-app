import mongoose from "mongoose";

export const ConnectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://giadab:ciao@cluster0.9dkp1.mongodb.net/blog-app');
    console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        throw new Error("DB Connection Failed");
    }
    
}