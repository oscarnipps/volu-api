import createError from 'http-errors'
import Event from "../models/Event.model.js"
import * as schemaValidation from '../util/validation/eventValidationSchema.js'

export const createEvent = async (req,res,next) =>{
    try{
        const validatedEvent = await schemaValidation.event.validateAsync(req.body)

        if(validatedEvent.error){
            throw createError.BadRequest()
        }
        
        res.status(201).send({
            status : "success",
            data : validatedEvent
        });

    }catch(error){
        next(error)
    }
}