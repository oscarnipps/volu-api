import createError from 'http-errors'
import EventCatgeory from "../models/EventCatgeory.model.js"
import * as schemaValidation from '../util/validation/eventCategoryValidationSchema.js'

export const getEventCategories = async (req,res,next) =>{
    try{
        const catgeories = await EventCatgeory.find()

        console.log(`event categories : ${catgeories}`)
        
        res.status(200).send({
            status : "success",
            data : catgeories
        });

    }catch(error){
        next(error)
    }
}

export const addEventCategories = async (req,res,next) =>{
    try{
        const validatedResult = await schemaValidation.validateEventCategory.validateAsync(req.body)

        console.log(`event categories : ${validatedResult}`)

        if(validatedResult.error){
           throw createError.BadRequest()
        }

        const result = await EventCatgeory.insertMany(validatedResult)

        res.status(201).send({
            status : "success",
            data : result
        });

    }
    catch(error){
        next(error)
    }
}