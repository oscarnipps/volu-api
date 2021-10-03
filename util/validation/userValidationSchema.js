import Joi from 'joi'
import objectId from 'joi-objectid'

 Joi.objectId = objectId(Joi)

export const userRegistration = Joi.object({
    first_name : Joi.string().required().min(2),

    last_name : Joi.string().required().min(2),
    
    sex : Joi.string().required().min(2),
    
    email : Joi.string().email().lowercase().required(),
    
    phone : Joi.string().required(),
    
    password : Joi.string().trim().required(),

    profile_image : Joi.string().allow(null, ""),

    events : Joi.array().items({
        event_id : Joi.objectId().messages({
            "string.pattern.name" : "invalid volunteer id"
         }),
 
        event_status : Joi.string().trim().messages({
            "string.empty" : "event verification status not provided",
            "any.required" : "event verification status required"
         })
    }),

    event_categories : [ Joi.string() ],

    event_rewards : Joi.array().items({
        reward_id : Joi.objectId().messages({ "string.pattern.name" : "invalid event reward id" }),
    })

});

export const userLogin = Joi.object({
    email : Joi.string().email().lowercase().required(),
    
    password : Joi.string().trim().required()
});

export const userId = Joi.object({
    id : Joi.objectId().required().messages({ 
        "string.pattern.name" : "invalid user id" ,
        "string.empty" : "user id required" ,
    }),
});

export const editUser = Joi.object({
   first_name : Joi.string(),

    last_name : Joi.string(),
    
    email : Joi.string().email().lowercase(),
    
    phone : Joi.string(),
    
    password : Joi.string().trim(),

    profile_image : Joi.string().allow(null, ""),

    event_categories : Joi.array().items(Joi.string()),
});