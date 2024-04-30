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
    credentials:true,
    origin: 'http://localhost:5173',
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true ,limit:'100mb'}))

app.use(cookieParser())

const PORT = process.env.PORT 


app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`)
})