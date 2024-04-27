import express from 'express'
const app = express()
import {config} from 'dotenv'
config()
const PORT = process.env.PORT



app.use('/api/user')
app.usr('/api/admin')


app.listen(PORT,() => {
    console.log(`port is running on ${PORT}`)
})