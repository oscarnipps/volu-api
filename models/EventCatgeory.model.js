import moongose from 'mongoose'

const Schema = moongose.Schema

const eventCategorySchema = Schema({
    category_name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true
    },

    image_url : {
        type : String,
        required : false,
        lowercase : true,
        trim : true
    }
})

let EventCategory = moongose.model("EventCategory" ,eventCategorySchema)

export default EventCategory