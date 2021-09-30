import Joi from 'joi'
import objectId from 'joi-objectid'

 Joi.objectId = objectId(Joi)

export const userRegistration = Joi.object({
    first_name : Joi.string().required().min(2),

    last_name : Joi.string().required().min(2),
    
    sex : Joi.string().required().min(2),
    
    email : Joi.string().email().lowercase().required(),
    
    phone : Joi.string().required(),
    
    password : Joi.string().required(),

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

    event_categories : [ Joi.string().required() ],

    event_rewards : Joi.array().items({
        reward_id : Joi.objectId().messages({ "string.pattern.name" : "invalid event reward id" }),
    })

});

export const userLogin = Joi.object({
    email : Joi.string().email().lowercase().required(),
    
    password : Joi.string().required()
});