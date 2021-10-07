import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import createError from 'http-errors'

const Schema = mongoose.Schema

const organizationSchema = Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    address : {
        type : String,
        required : true,
        trim : true
    },

    location : {
        type : String,
        required : true,
        trim : true
    },

    phone : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },

    password : {
        type : String,
        required : true,
        trim : true
    },

    profile_image : {
        type : String,
        required : false
    },

    sector : {
        type : String,
        required : true,
        trim : true
    }
})

organizationSchema.pre("save" , async function (next) {
    try {
        const salt = await bcrypt.genSalt(10) 
        
        const hashedPassword = await bcrypt.hash(this.password , salt)
        
        this.password = hashedPassword

        next()
        
    } catch (error) {
        next(error)
    }  
})

organizationSchema.pre("save" , async function (next) {
    try {
        const organization = await Organization.find({$or : [ {email : this.email}, {phone : this.phone} ] })

        if(Object.entries(organization).length !== 0){
  
            let message = this.email == organization[0].email ? "email already exists" : "phone number already exists"
            
            throw createError.Conflict(message)
        }

        next()
        
    } catch (error) {
        next(error)
    }  
})

organizationSchema.method("isValidPassword", async function (password){
    try {
       return await bcrypt.compare(password, this.password) 
    } catch (error) {
        throw error
    }
})

let Organization = mongoose.model("Organization",organizationSchema)

export default Organization