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

})

let EventBrief = mongoose.model("EventBrief",eventBriefSchema);

export default EventBrief;