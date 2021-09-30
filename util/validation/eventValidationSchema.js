import Joi from 'joi'
import objectId from 'joi-objectid'

 Joi.objectId = objectId(Joi)

export const event = Joi.object({
    name : Joi.string().required().trim(),

    organization : {
        name : Joi.string().required().trim(),
        image_url : Joi.string().allow(null,"")
    },

    category_name : Joi.string().required().trim(),

    reward_id : Joi.objectId().messages({ "string.pattern.name" : "invalid reward id"}),

    volunteers : Joi.array().items({

       volunteer_id : Joi.objectId().messages({ "string.pattern.name" : "invalid volunteer id"}),

       volunteer_status : Joi.string().required().trim().messages({
           "string.empty" : "volunteer verification status not provided",
           "any.required" : "volunteer verification status required"
        })

    }),

    event_status : Joi.string().required().trim().messages({
            "any.required" : "event status required",
            "string.empty" : "event status not provided"
        }),

    start_time : Joi.string().required().trim().messages({
        "string.empty" : "event start time not provided",
        "any.required" : "event start time required"
    }),

    stop_time : Joi.string().required().trim().messages({
        "string.empty" : "event stop date not provided",
        "any.required" : "event stop date required"  
    }),

    start_date : Joi.string().required().trim().messages({
        "string.empty" : "event start date not provided",
        "any.required" : "event start date required"
    }),

    stop_date : Joi.string().required().trim().messages({
        "string.empty" : "event stop date not provided",
        "any.required" : "event stop date required"
     }),

    address : Joi.string().required().trim().messages({
        "string.empty" : "address not provided",
        "any.required" : "event address required"
    }),

    location : Joi.string().required().trim().messages({
        "string.empty" : "location not provided",
        "any.required" : "location required"
    }),

    isPaid : Joi.boolean().required().messages({ "any.required" : "event payment status required"}),

    amount : Joi.number().required().messages({ "any.required" : "volunteer amount required for paid event"})
})