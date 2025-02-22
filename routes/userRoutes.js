import express from "express";
import User from "../Models/user.js";

const userRoutes = express.Router()

/**
 * @swagger
 * /users/create:  # <-- Add "users" prefix
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
userRoutes.post("/create", async (req, res) => {
    try {
        const { name, email, city } = req.body;
        const user = new User({ name, email, city });
        await user.save();
        return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

/**
 * @swagger
 * /users/get:  # <-- Add "users" prefix
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
userRoutes.get("/get", async (req, res) => {
    try {
        const userData = await User.find();
        return res.status(200).json({ message: "User data fetched successfully!", data: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


export default userRoutes