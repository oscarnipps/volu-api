import express from 'express'
import * as eventController from '../controllers/event.controller.js'


const router = express.Router()


router.post("/create" , eventController.createEvent)

export {router}