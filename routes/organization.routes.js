import express from 'express'
import * as organizationController from '../controllers/organization.controller.js'
import * as authTokenMiddleware from '../middlewares/authTokenMiddleware.js'

const router = express.Router()

router.post("/register", organizationController.createOrganization) 

export {router}