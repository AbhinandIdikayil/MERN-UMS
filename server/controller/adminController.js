import mongoose from 'mongoose'

const credentials = {
    email:'example@gmail.com',
    password:'example123'
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if(email === credentials.email){
            if(password === credentials.password){
                return res.json()
            }
        }
    } catch (error) {
        console.log(error)
    }
}