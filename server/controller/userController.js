import { userModel } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const userSignup = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            image
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
        console.log(password)
        let userData = await userModel.findOne({ email });
        console.log('from login')
        if (userData) {
            let encryptedPassword = await bcrypt.compare(password, userData.password)
            console.log(encryptedPassword)
            if (encryptedPassword) {
                const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
                res.cookie("userJWT", token, {
                    httpOnly: true,
                    sameSite: "none",
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                })
                return res.status(201).json({ success: true, message: "User Logged in successfully", token, userId: userData._id });
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

export const userLogout = async (req, res) => {
    try {
        // res.cookie('userJWT', {
        //     httpOnly: true,
        //     expires: new Date(0)
        // })
        res.clearCookie('userJWT')
        res.status(200).json({ message: 'user logout' })
    } catch (error) {
        console.log(error)
    }
}

export const getUserDetails = async (req, res) => {
    try {
        console.log(req.user)
        let user = {
            _id: req?.user?._id,
            username: req?.user?.username,
            email: req?.user?.email,
            image: req?.user?.image?.imageSecureUrl
        }
        return res.status(200).json({ user, success: true })
    } catch (error) {
        console.log(error)
    }
}