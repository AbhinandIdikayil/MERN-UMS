import express from 'express'
import { config } from 'dotenv'
config()
import adminRoute from './routes/adminRoute.js'
import userRoute from './routes/userRoute.js'
import { dbConnect } from './config/connectoin.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
dbConnect()


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '100mb' }))
app.use(cookieParser())

const PORT = process.env.PORT


app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})