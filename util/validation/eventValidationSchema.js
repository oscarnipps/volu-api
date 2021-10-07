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

    award_id : Joi.objectId().messages({ "string.pattern.name" : "invalid reward id"}),

    brief_id : Joi.objectId().messages({ "string.pattern.name" : "invalid brief id"}),

    volunteers : Joi.array().items({

       id : Joi.objectId().messages({ "string.pattern.name" : "invalid volunteer id"}),

       status : Joi.string().trim().messages({
           "string.empty" : "volunteer verification status not provided",
           "any.required" : "volunteer verification status required"
        })

    }),

    status : Joi.string().required().trim().messages({
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

    is_paid : Joi.boolean().required().messages({ "any.required" : "event payment status required"}),

    amount : Joi.number().required().messages({ "any.required" : "volunteer amount required for paid event"})
})

export const eventId = Joi.object({
    id : Joi.objectId().required().messages({ 
        "string.pattern.name" : "invalid event id" ,
        "string.empty" : "event id required" ,
    })
});

export const eventStatus = Joi.object({
    status : Joi.string().required().messages({   "string.empty" : "event status required" }),

    event_id : Joi.objectId().required().messages({ 
        "string.pattern.name" : "invalid event id" ,
        "string.empty" : "event id required" ,
    })
});

export const editEvent = Joi.object({
    name : Joi.string(),
 
    category_name : Joi.string(),
          
    status : Joi.string(),
    
    volunteers : Joi.array().items({

        id : Joi.objectId().messages({ "string.pattern.name" : "invalid volunteer id"}),
 
        status : Joi.string().trim().messages({"string.empty" : "volunteer verification status not provided"})
 
     }),

    status : Joi.string().trim().messages({"any.required" : "event status required"}),

    start_time : Joi.string().trim().messages({ "string.empty" : "event start time not provided"}),

    stop_time : Joi.string().trim().messages({ "string.empty" : "event stop date not provided"  }),

    start_date : Joi.string().trim().messages({"string.empty" : "event start date not provided"}),

    stop_date : Joi.string().trim().messages({ "string.empty" : "event stop date not provided"}),

    address : Joi.string().trim().messages({ "string.empty" : "address not provided"}),

    location : Joi.string().trim().messages({ "string.empty" : "location not provided",}),

    is_paid : Joi.boolean(),

    amount : Joi.number()

 });