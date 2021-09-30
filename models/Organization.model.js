import mongoose from 'mongoose'

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

let Organization = mongoose.model("Organization",organizationSchema)

export default Organization