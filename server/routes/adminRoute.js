import express from 'express'
const adminRoute = express.Router()
import { adminLogin, adminLogout, getUsers } from '../controller/adminController.js'

adminRoute.post('/login', adminLogin);
adminRoute.post('/logout', adminLogout);
adminRoute.get('/home', getUsers)


export default adminRoute