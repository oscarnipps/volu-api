import express from 'express'
import * as eventController from '../controllers/event.controller.js'
import * as eventCatgeoryController from '../controllers/eventCategory.controller.js'
import * as authTokenMiddleware from '../middlewares/authTokenMiddleware.js'

const router = express.Router()

router.post("/create" , authTokenMiddleware.verifyAuthToken ,  eventController.createEvent)

router.patch("/edit/:id" , authTokenMiddleware.verifyAuthToken ,  eventController.editEvent)

router.get("/:id" , authTokenMiddleware.verifyAuthToken , eventController.getEvent)

router.patch("/edit/status" ,  eventController.editEventStatus)

router.patch("/:id/volunteers/status/edit" ,  eventController.editVolunteersStatus)

router.post("/apply/:eventId/:userId" , authTokenMiddleware.verifyAuthToken ,  eventController.applyForEvent)

router.get("/categories", eventCatgeoryController.getEventCategories) 

router.get("/search",authTokenMiddleware.verifyAuthToken, eventController.searchEvents) 

router.post("/categories/create", eventCatgeoryController.addEventCategories) 

export {router}