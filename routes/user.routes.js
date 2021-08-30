import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

//login user
router.post("/login", userController.logInUser)

//register user
router.post("/register", userController.registerUser)


export {router}





