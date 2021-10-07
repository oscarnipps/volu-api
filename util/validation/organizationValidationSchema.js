import Joi from 'joi'

export const organization = Joi.object({
    name : Joi.string().required().lowercase(),

    email : Joi.string().email().lowercase().required(),
    
    phone : Joi.string().required(),
    
    password : Joi.string().required(),

    sector : Joi.string().required(),

    location : Joi.string().required(),
    
    address : Joi.string().required(),

    profile_image : Joi.string().allow(null,"")
})

export const userLogin = Joi.object({
    email : Joi.string().email().lowercase().required(),
    
    password : Joi.string().trim().required()
});
