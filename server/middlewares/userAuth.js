import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()
const jwtSecret = process.env.JWT_SECRET
import { userModel } from '../models/userModel.js'

export const verfiyToken = (req, res, next) => {
    const token = req.cookies.userJWT;
    console.log(req.headers)
    console.log("jwt token", token)
    if (!token) return res.status(401).json({ error: "access denied" });
    try {
        jwt.verify(token, jwtSecret, async (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "Failed to authenticate token" });
            }
            req.user = await userModel.findById(decoded.userId);
            console.log(req.user)
            next();
        });
    } catch (error) {
        res.status(401).json({ error: "invalid token" });
        throw new Error("Not authorized, no token");
    }
};
