import jwt, { decode } from 'jsonwebtoken'
import { config } from 'dotenv'
config()
const jwtSecret = process.env.JWT_SECRET
import { userModel } from '../models/userModel.js'
import mongoose from 'mongoose'

export const verfiyToken = (req, res, next) => {
    const token = req.cookies.userJWT;
    if (!token) return res.status(401).json({ error: "access denied" });
    try {
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Failed to authenticate token" });
            }
            if (decoded) {
                const id = decoded?.userId
                userModel.findOne({_id : new mongoose.Types.ObjectId(id)})
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(error => {
                        // Handle errors fetching the user
                        console.error("Error fetching user:", error);
                        res.status(500).json({ error: "Internal server error" });
                    });
            }

        });
    } catch (error) {
        res.status(401).json({ error: "invalid token" });
        throw new Error("Not authorized, no token");
    }
};
