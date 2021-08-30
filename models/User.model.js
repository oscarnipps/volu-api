import mongoose from 'mongoose'

const Schema = mongoose.Schema

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

    password : {
        type : String,
        required : true,
        trim : true
    }
});

let User = mongoose.model("User",userSchema);

export default User;