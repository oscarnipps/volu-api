import Joi from 'joi'

export const userRegistration = Joi.object({
    first_name : Joi.string().required().min(2),
    
    last_name : Joi.string().required().min(2),
    
    sex : Joi.string().required().min(2),
    
    email : Joi.string().email().lowercase().required(),
    
    phone : Joi.string().required(),
    
    password : Joi.string().required()
});

export const userLogin = Joi.object({
    email : Joi.string().email().lowercase().required(),
    
    password : Joi.string().required()
});