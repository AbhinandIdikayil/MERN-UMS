import express from 'express'
import { userSignup , userLogin } from '../controller/userController.js'
const userRoute = express.Router();

userRoute.post('/signup',userSignup)
userRoute.post('/login', userLogin)


export default userRoute