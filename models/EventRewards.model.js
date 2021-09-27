import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventAwardSchema = Schema({
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

let EventAwards = mongoose.model("EventAwards",eventAwardSchema);

export default EventAwards;