import { Router } from "express";
import User from "../models/User.js";

const userRoutes = Router();

// Get all users route
userRoutes.get("/", async (req, res) => {
    try {
        // Retrieve all users, excluding sensitive fields
        const users = await User.findAll({
            attributes: { 
                exclude: ['password', 'external_id'] 
            },
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            message: "Users retrieved successfully",
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Server error retrieving users" });
    }
});

export default userRoutes;