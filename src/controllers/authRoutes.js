import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRoutes = Router();

// Create new user route
authRoutes.post("/create-user", async (req, res) => {
    try {
        const { username, password, email, first_name, last_name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            where: { 
                username: username 
            } 
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            first_name,
            last_name,
            auth_provider: 'local',
            is_active: true
        });

        res.status(201).json({ 
            message: "User created successfully", 
            userId: newUser.id 
        });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ message: "Server error during user creation" });
    }
});

// Login route
authRoutes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ 
            where: { 
                username: username,
                auth_provider: 'local',
                is_active: true 
            } 
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                email: user.email 
            }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );

        // Update last login
        await user.update({ last_login: new Date() });

        // Send tokens in response
        res.status(200).json({
            message: "Login successful",
            access: accessToken,
            refresh: refreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

// Refresh token route
authRoutes.post("/refresh", async (req, res) => {
    try {
        const { refresh } = req.body;

        // Verify refresh token
        const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

        // Find user
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                email: user.email 
            }, 
            process.env.JWT_ACCESS_SECRET, 
            { expiresIn: '15m' }
        );

        res.status(200).json({ 
            message: "Token refreshed successfully", 
            access: newAccessToken 
        });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
});

export default authRoutes;