import express from 'express'
import * as eventController from '../controllers/event.controller.js'
import * as eventCatgeoryController from '../controllers/eventCategory.controller.js'
import * as authTokenMiddleware from '../middlewares/authTokenMiddleware.js'

const router = express.Router()

router.get("/" , authTokenMiddleware.verifyAuthToken , eventController.getEvent)

router.post("/create" , authTokenMiddleware.verifyAuthToken ,  eventController.createEvent)

router.post("/edit/:id" , authTokenMiddleware.verifyAuthToken ,  eventController.editEvent)

router.patch("/edit/status" , authTokenMiddleware.verifyAuthToken ,  eventController.editEventStatus)

router.post("/apply/:eventId/:userId" , authTokenMiddleware.verifyAuthToken ,  eventController.applyForEvent)

router.get("/categories", eventCatgeoryController.getEventCategories) 

router.get("/search",authTokenMiddleware.verifyAuthToken, eventController.searchEvents) 

router.post("/categories/create", eventCatgeoryController.addEventCategories) 

export {router}