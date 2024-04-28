import mongoose from 'mongoose'

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB CONNECTED SUCCESSFULLY')
    } catch (error) {
        console.log(error)
    }
}