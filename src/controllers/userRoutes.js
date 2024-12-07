import { Router } from "express";
import User from "../models/User.js";
import { Op } from "sequelize";

const userRoutes = Router();

// Get all users route
userRoutes.get("/", async (req, res) => {
    try {
        // Retrieve all users, excluding sensitive fields
        const users = await User.findAll({
            attributes: { 
                exclude: ['password'] 
            },
            order: [['createdAt', 'DESC']],
            limit: 100
        });

        console.log("Users found:", users.length);
        console.log("First user (if any):", users[0]);

        return res.status(200).json({
            message: "Users retrieved successfully",
            count: users.length,
            users: users
        });

    } catch (error) {
        console.error("Get users error:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({ 
            message: "Server error retrieving users",
            errorDetails: error.message 
        });
    }
});

export default userRoutes;