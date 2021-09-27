import Joi from 'joi'
import objectId from 'joi-objectid'

 Joi.objectId = objectId(Joi)

export const event = Joi.object({
    event_name : Joi.string().required().trim(),

    organization : {
        name : Joi.string().required().trim(),
        image_url : Joi.string().allow(null,"")
    },

    event_category_name : Joi.string().required().trim(),

    reward_id : Joi.objectId().messages({
        "string.pattern.name" : "invalid reward id"
    })
})