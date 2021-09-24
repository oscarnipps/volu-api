import Joi from 'joi'

export const validateEventCategory = Joi.array().items({
    category_name : Joi.string().required().lowercase(),
    image_url : Joi.string().allow(null,"")
})


