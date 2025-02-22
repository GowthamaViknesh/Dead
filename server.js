import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./Models/user.js";
import setupSwagger from "./swagger.config.js";

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


/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new user
 *     description: This API creates a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
app.post("/create", async (req, res) => {
    try {
        const { name, email, city } = req.body;
        const user = new User({ name, email, city });
        await user.save();
        return res.status(201).json({ message: "User created successfully!" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" }, error)
    }
})


/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully fetched user data
 *       500:
 *         description: Internal server error
 */
app.get("/get", async (req, res) => {
    try {
        const userData = await User.find()
        return res.status(200).json({ message: "User data fetch Successfully!", data: userData })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" }, error)
    }
})