import express from 'express'
import { verfiyToken } from '../middlewares/userAuth.js'
import { userSignup, userLogin, userLogout, getUserDetails, getSingleUser, editProfile } from '../controller/userController.js'
const userRoute = express.Router();

userRoute.post('/signup', userSignup)
userRoute.post('/login', userLogin)
userRoute.post('/logout', userLogout);

userRoute.get('/home', verfiyToken, getUserDetails);
userRoute.get('/single-user', verfiyToken, getSingleUser)
userRoute.post('/update/:userID', editProfile)



export default userRoute