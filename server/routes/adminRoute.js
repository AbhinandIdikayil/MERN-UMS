import express from 'express'
const adminRoute = express.Router()
import {adminLogin} from '../controller/adminController.js'

adminRoute.post('/login',adminLogin)


export default adminRoute