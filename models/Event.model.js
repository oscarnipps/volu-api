import mongoose from 'mongoose'

const Schema = mongoose.Schema

const volunteersSchema = Schema ({
    id : {
        type :  mongoose.ObjectId,
        ref : 'User',
        required : true
    },

    status :  {
        type : String,
        required : true,
        trim : true
    }
})

const eventSchema = Schema({
    event_name : {
        type : String,
        required : true,
        trim : true
    },

    organization : {
        name : {
            type : String,
            required : true,
            trim : true
        },

        image_url : {
            type : String,
            required : false,
            trim : true
        },
    },

    event_category_name : {
        type : String,
        required : true,
        trim : true
    },

    award_id : {
        type :  mongoose.ObjectId,
        ref : 'EventRewards',
        required : false
    },

    brief_id : {
        type :  mongoose.ObjectId,
        ref : 'EventRewards',
        required : false
    },

    volunteers : [volunteersSchema],

    start_time : {
        type : String,
        required : true,
        trim : true
    },

    stop_time : {
        type : String,
        required : true,
        trim : true
    },

    start_date : {
        type : String,
        required : true,
        trim : true
    },

    stop_date : {
        type : String,
        required : true,
        trim : true
    },

    satus : {
        type : String,
        required : true,
        trim : true
    },

    is_paid : {
        type : Boolean,
        required : true
    },

    amount : {
        type : Number,
        required : true
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
    }
})

let Event = mongoose.model("Event",eventSchema);

export default Event;