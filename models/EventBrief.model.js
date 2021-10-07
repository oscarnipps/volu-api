import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventBriefSchema = Schema({
    title :  {
        type : String,
        required : true,
        trim : true
    },

    url :  {
        type : String,
        required : true,
        trim : true
    },

    event_id : {
        type :  mongoose.ObjectId,
        ref : 'Event',
        required : true
    },

    brief_type : {
        type : String,
        required : true,
        trim : true
    },

})

let EventBriefs = mongoose.model("EventBriefs",eventBriefSchema);

export default EventBriefs;