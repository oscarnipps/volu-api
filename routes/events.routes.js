import express from 'express'
import * as eventController from '../controllers/event.controller.js'
import * as authTokenMiddleware from '../middlewares/authTokenMiddleware.js'

const router = express.Router()

router.get("/" , authTokenMiddleware.verifyAuthToken ,eventController.getEvent)

router.post("/create" , eventController.createEvent)

export {router}