import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import createError from 'http-errors'

const Schema = mongoose.Schema

const eventRewardsSchema = Schema ({
    id : {
        type :  mongoose.ObjectId,
        ref : 'EventReward',
        required : false
    }
})

const eventSchema = Schema ({
    id : {
        type :  mongoose.ObjectId,
        ref : 'Event',
        required : false
    },

    status :  {
        type : String,
        required : false,
        trim : true
    }
})

const userSchema = Schema({
    first_name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },

    last_name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },

    sex : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },
    
    phone : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },

    profile_image : {
        type : String,
        required : false,
        trim : true,
    },

    password : {
        type : String,
        required : true,
        trim : true
    },

    event_categories : {
        type : Array
    },

    events : [eventSchema],

    event_rewards : [eventRewardsSchema],

});

userSchema.pre("save" , async function (next) {
    try {
        const salt = await bcrypt.genSalt(10) 
        
        const hashedPassword = await bcrypt.hash(this.password , salt)
        
        this.password = hashedPassword

        next()
        
    } catch (error) {
        next(error)
    }  
})

userSchema.pre("save" , async function (next) {
    try {
        const user = await User.find({$or : [ {email : this.email}, {phone : this.phone} ] })

        if(Object.entries(user).length !== 0){
  
            let message = this.email == user[0].email ? "user email already exists" : "user with phone number already exists"
            
            throw createError.Conflict(message)
        }

        next()
        
    } catch (error) {
        next(error)
    }  
})

userSchema.method("isValidPassword", async function (password){
    try {
       return await bcrypt.compare(password, this.password) 
    } catch (error) {
        throw error
    }
})

let User = mongoose.model("User",userSchema);

export default User;