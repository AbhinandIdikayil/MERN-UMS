import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        imageUrl:{
            type:String
        },
        imageSecureUrl:{
            type:String,
        },
        publicId:{
            type:String
        }
    }
}, { timestamps: true })

export const userModel =  mongoose.model('user', userSchema)
