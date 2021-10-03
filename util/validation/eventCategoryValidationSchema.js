import Joi from 'joi'

export const eventCategory = Joi.array().items({
    category_name : Joi.string().required().lowercase(),
    image_url : Joi.string().allow(null,"")
})


