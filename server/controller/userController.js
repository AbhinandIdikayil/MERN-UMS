import { userModel } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { uploadToCloudinary } from '../services/cloudinary.js'



export const userSignup = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;
        console.log(req.body)
        let imageData = {}
        if(image){
            const results = await uploadToCloudinary(image,'uploads')
            imageData = results
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            image:imageData
        })
        let User = await newUser.save();
        console.log(User)
        return res.status(200).json({ success: true, message: 'user created successfully' })
    } catch (error) {
        console.log(error)
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userData = await userModel.findOne({ email });
        console.log(userData, req.body)
        let encryptedPassword = await bcrypt.compare(password, userData.password)
        if (userData) {
            if (encryptedPassword) {
                const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ success: true, message: "User Logged in successfully", token, userId: userData._id });
            } else {
                return res.status(401).json({ message: 'incorrect password' })
            }
        } else {
            return res.status(404).json({ message: 'user not found' })
        }
    } catch (error) {
        console.log(error)
    }
}