import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.post("/login", userController.logInUser)

router.post("/logout", userController.logOutUser)

router.post("/register", userController.registerUser)

export {router}





