import createError from 'http-errors'
import Event from "../models/Event.model.js"
import User from '../models/User.model.js'
import * as schemaValidation from '../util/validation/eventValidationSchema.js'

export const createEvent = async (req,res,next) =>{
    try{
        const validatedEvent = await schemaValidation.event.validateAsync(req.body)

        if(validatedEvent.error){
            throw createError.BadRequest()
        }

        let result = await Event(validatedEvent).save()

        console.log(result)
        
        res.status(201).send({
            status : "success",
            data : result
        });

    }catch(error){
        next(error)
    }
}

export const getEvent = async (req,res,next) =>{
    try{
        const result = await Event.find()
        
        res.status(201).send({
            status : "success",
            data : result
        });

    }catch(error){
        next(error)
    }
}

export const searchEvents = async (req,res,next) =>{
    try{
        //validate req query parameters
        let {start_date , stop_date , start_time,stop_time,location ,is_paid , category_name} = req.query

        console.table(req.query)
        
        let results = await Event.find({
            $or : [
                {start_date},
                {stop_date},
                {start_time},
                {stop_time},
                {location},
                {is_paid},
                {category_name}
            ]
        } , "-__v")

        console.log(results)
        
        res.status(200).send({
            status : "success",
            data : results
        });

    }catch(error){
        next(error)
    }
}

export const editEvent = async (req,res,next) => {
    try {
        const validatedEventId = await schemaValidation.eventId.validateAsync(req.params)
        
        const validatedEventDetails = await schemaValidation.editEvent.validateAsync(req.body)

        if(!validatedEventId || !validatedEventDetails){
            let errorMessage = !validatedUserId ? validatedEventId.message : validatedEventDetails.message
            throw createError.BadRequest(errorMessage)
        }

        const event = await Event.find({_id : validatedEventId.id }, "-__v -_id")

        if(!event){
            throw createError.NotFound("event not found")
        }

        console.log(event)

        let itemsToUpdate = {}

        //get the query projection i.e items to update
        for(const item in validatedEventDetails){
            itemsToUpdate[item] = validatedEventDetails[item] 
        }

        console.log("items : " + JSON.stringify( itemsToUpdate))

        if(itemsToUpdate["status"] === "completed"){
            console.log("updating volunteers status to completed...")
        }

        // let updatedResult = await Event.updateOne({_id : validatedEventId.id}, itemsToUpdate)

        res.status(201).send({
            status : "success",
            data : itemsToUpdate
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}

export const applyForEvent = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.eventId.validateAsync(req.params)

        let {eventId ,userId} = validatedResult

        let udpatedEvent =  await Event.updateOne( 
            {_id : eventId},
            {
                $push : {
                    volunteers : {
                        id : userId , 
                        status : "not-started"
                    }
                }
            }
        )

        res.status(201).send({
            status : "success",
            data : udpatedEvent
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}

export const editEventStatus = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.eventStatus.validateAsync(req.body)

        let {status ,event_id} = validatedResult

        let udpatedEvent =  await Event.updateOne( 
            {_id : event_id},
            {
                $set : {
                    "volunteers.$[].status" : status
                }
            }
        )

        res.status(201).send({
            status : "success",
            data : udpatedEvent
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}
