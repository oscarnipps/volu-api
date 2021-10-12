import createError from 'http-errors'
import Event from "../models/Event.model.js"
import User from '../models/User.model.js'
import * as schemaValidation from '../util/validation/eventValidationSchema.js'

export const createEvent = async (req,res,next) =>{
    try{
        const validatedRequestBody = await schemaValidation.event.validateAsync(req.body)

        if(validatedRequestBody.error){
            throw createError.BadRequest()
        }

        let result = await Event(validatedRequestBody).save()

        console.log(result)
        
        res.status(201).send({
            status : "success",
            data : result
        });

    }catch(error){
        next(error)
    }
}


export const editVolunteersStatus = async (req,res,next) =>{
    try{
        let validatedRequestParam = await schemaValidation.eventId.validateAsync(req.params)

        let validatedRequestBody = await schemaValidation.eventVolunteers.validateAsync(req.body)

        if(!validatedRequestParam || !validatedRequestBody){
            let errorMessage = !validatedRequestParam ? validatedRequestParam.message : validatedRequestBody.message
            throw createError.BadRequest(errorMessage)
        }

        console.log(validatedRequestBody)

        let udpatedEvent = await Event.updateOne(
            {_id : validatedRequestParam.id } , 
            {$set : { volunteers : validatedRequestBody}}
        )

        //todo: use the payload to send push notifications to the volunteers based on the  updated status

        console.log(`event modified : ${udpatedEvent.nModified}`)
        
        res.status(201).send({
            status : "success",
            data : validatedRequestBody
        });

    }catch(error){
        next(error)
    }
}

export const getEvent = async (req,res,next) =>{
    try{
        let validatedRequestParam = await schemaValidation.eventId.validateAsync(req.params)

        const event = await Event.find({_id : validatedRequestParam.id } , "-__v -_id")

        if(!event){
            throw createError.NotFound("event not found")
        }
        
        res.status(200).send({
            status : "success",
            data : event
        });

    }catch(error){
        next(error)
    }
}

export const searchEvents = async (req,res,next) =>{
    try{
        //validate req query parameters
        let {start_date , stop_date , start_time, stop_time ,location ,is_paid , category_name} = req.query

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
        const validatedRequestParam = await schemaValidation.eventId.validateAsync(req.params)
        
        const validatedEventDetails = await schemaValidation.editEvent.validateAsync(req.body)

        if(!validatedRequestParam || !validatedEventDetails){
            let errorMessage = !validatedUserId ? validatedEventId.message : validatedEventDetails.message
            throw createError.BadRequest(errorMessage)
        }

        const event = await Event.find({_id : validatedRequestParam.id }, "-__v -_id")

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

        // if(itemsToUpdate["status"] === "completed"){
        //     console.log("updating volunteers status to completed...")
        // }

        await Event.updateOne({_id : validatedRequestParam.id}, itemsToUpdate)

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
        const validatedResult = await schemaValidation.eventApplication.validateAsync(req.params)

        let {eventId ,userId} = validatedResult

        let udpatedEvent =  await Event.updateOne( 
            {_id : eventId},
            {
                $push : {
                    volunteers : {
                        id : userId , 
                        status : "pending"
                    }
                }
            }
        )

        //todo: send push notification to organization that a volunteer has applied for the created event

        let udpatedUser = await User.updateOne(
            {_id : userId}, 
            {
                 $push : {
                     events : { 
                         id : eventId , 
                         status : "not-started"
                    }
                }
            }
        )

        //event and user modified would be 1 if successful
        console.log(`event modified : ${udpatedEvent.nModified} , user modified : ${udpatedUser.nModified}`)

        res.status(201).send({
            status : "success",
            message : "applied for event successfully"
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

        await Event.updateOne( 
            {_id : event_id},
            {
                $set : {
                    "status" : status,
                    "volunteers.$[].status" : status
                }
            }
        )

        let eventVolunteers = await Event.find( {_id : event_id} , "volunteers -_id")

        let volunteerIds = []

        eventVolunteers[0].volunteers.forEach( item => { volunteerIds.push(item.id) } );

        console.log(JSON.stringify( eventVolunteers))

        await User.updateMany(
            {_id : volunteerIds} , 
            {
                $set : {
                    "events.status" : status
                }
            }
        )

        //todo: send a notification to all the volunteers (using their id's) signifying the updated status

        res.status(201).send({
            status : "success",
            data : eventVolunteers
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}
