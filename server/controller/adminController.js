import { admin } from '../models/adminModel.js'
import { config } from 'dotenv'
config()
import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const adminData = await admin.findOne({ email });
        if (adminData) {
            if (password == adminData?.password) {
                const token = jwt.sign({ adminId: adminData.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                res.cookie('adminJWT', {
                    httpOnly: true,
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
        // res.cookie('adminJWT', {
        //     httpOnly: true,
        //     expires: new Date(0)
        // })
        res.clearCookie('adminJWT')
        return res.status(200).json({ message: 'user logoutuot successfully' })
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password')
        return res.status(200).json({ users, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;
        const existingUser = await userModel.findOne({ email }).select('-password')
        console.log(existingUser);
        if (existingUser) {
            return res.status(409).json({ error: 'email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            image
        })
        let User = await newUser.save();
        return res.status(200).json({ success: true, message: 'user created successfully' })
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (deletedUser) {
            return res.status(200).json({ success: true})
        }
    } catch (error) {
        console.log(error)
    }
}

export const getSingleUser = async (req,res) => {
    try {
        const {userID} = req.params
        const userData = await userModel.findById(userID)
        return res.status(200).json({success:true,userData})
    } catch (error) {
        console.log(error)
    }
}

export const editUser = async (req, res) => {
    try {
        const {userID} = req.params
        const { username,email,image } = req.body
        if(userID){
            const user = await userModel.findByIdAndUpdate(
                userID,
                {
                    $set:{username,email,image}
                },
                {
                    new : true
                }
            )
            console.log(user)
            return res.status(200).json({success:true})
        }
    } catch (error) {
        console.log(error)
    }
}

