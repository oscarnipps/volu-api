import express from 'express'
import * as eventCatgeoryController from '../controllers/eventCategory.controller.js'

const router = express.Router()

router.get("", eventCatgeoryController.getEventCategories) 

router.post("/create", eventCatgeoryController.addEventCategories) 

export {router}