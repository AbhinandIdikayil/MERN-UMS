import express from 'express'
const adminRoute = express.Router()
import { adminLogin, adminLogout, getUsers, deleteUser, addUser } from '../controller/adminController.js'

adminRoute.post('/login', adminLogin);
adminRoute.post('/logout', adminLogout);


adminRoute.get('/home', getUsers)
adminRoute.delete('/delete', deleteUser)
adminRoute.post('/add', addUser)


export default adminRoute