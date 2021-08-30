import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

// router.get("/", userController.getUser)

//regitser user
router.post("/register", userController.registerUser)

//delete user

//login user

//edit user


export {router}





