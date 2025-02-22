import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./Models/user.js";
import setupSwagger from "./swagger.config.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
setupSwagger(app)

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/mydatabase";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port: ${PORT}`);
    });
});

app.use("/users", userRoutes);