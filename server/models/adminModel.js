import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    }
})

export const admin = mongoose.model('admin',adminSchema)