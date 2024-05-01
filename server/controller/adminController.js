import mongoose from 'mongoose'
import { admin } from '../models/adminModel.js'
import { config } from 'dotenv'
config()
import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'
const credentials = {
    email: 'example@gmail.com',
    password: 'example123'
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const adminData = await admin.findOne({ email });
        if (adminData) {
            if (password == adminData?.password) {
                const token = jwt.sign({ adminId: adminData.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                res.cookie('adminJWT', {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })
                return res.status(200).json({ token, success: true, message: 'admin logged successfully' });
            } else {
                return res.status(401).json({ message: 'password is incorrect' });
            }
        } else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
}
export const adminLogout = async (req, res) => {
    try {
        res.cookie('adminJWT', {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.status(200).json({ message: 'user logoutuot successfully' })
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password')
        return res.status(200).json({users,success:true})
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

