import express from 'express'
import { userSignup , userLogin } from '../controller/userController.js'
import upload from '../middlewares/multer.js';
const userRoute = express.Router();

userRoute.post('/signup',upload.single("image"), userSignup)
userRoute.post('/login', userLogin)


export default userRoute