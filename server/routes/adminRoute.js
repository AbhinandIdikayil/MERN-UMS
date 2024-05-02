import express from 'express'
const adminRoute = express.Router()
import { adminLogin, adminLogout, getUsers, deleteUser, addUser, getSingleUser, editUser } from '../controller/adminController.js'

adminRoute.post('/login', adminLogin);
adminRoute.post('/logout', adminLogout);

adminRoute.get('/home', getUsers)
adminRoute.delete('/delete', deleteUser)
adminRoute.post('/add', addUser)
adminRoute.get('/single-user/:userID',getSingleUser)
adminRoute.post('/update-user/:userID', editUser)


export default adminRoute