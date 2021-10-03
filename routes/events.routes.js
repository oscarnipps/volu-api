import express from 'express'
import * as eventController from '../controllers/event.controller.js'
import * as eventCatgeoryController from '../controllers/eventCategory.controller.js'
import * as authTokenMiddleware from '../middlewares/authTokenMiddleware.js'

const router = express.Router()

router.get("/" , authTokenMiddleware.verifyAuthToken , eventController.getEvent)

router.post("/create" , authTokenMiddleware.verifyAuthToken ,  eventController.createEvent)

router.get("/categories", eventCatgeoryController.getEventCategories) 

router.post("/categories/create", eventCatgeoryController.addEventCategories) 

export {router}