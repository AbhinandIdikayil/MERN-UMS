import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:string
    }
})

export const admin = mongoose.model('admin',adminSchema)