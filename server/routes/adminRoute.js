import express from 'express'
const adminRoute = express.Router()
import {adminLogin, adminLogout} from '../controller/adminController.js'

adminRoute.post('/login',adminLogin);
adminRoute.post('/logout',adminLogout)


export default adminRoute