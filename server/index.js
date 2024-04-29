import express from 'express'
import { config } from 'dotenv'
config()
import { v2 as cloudinary } from 'cloudinary'
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'
import { dbConnect } from './config/connectoin.js'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
dbConnect()
app.use(cors())
// app.use(bodyParser({limit:'2-mb'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true ,limit:'100mb'}))

const PORT = process.env.PORT



app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})