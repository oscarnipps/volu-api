
import User from '../models/User.model.js'
import * as schemaValidation from '../util/validation/userValidationSchema.js'
import * as jwtUtil from '../util/jwtUtil.js'
import createError from 'http-errors'
import Joi from 'joi'


export const registerUser = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.userRegistration.validateAsync(req.body);
        
        if(validatedResult.error){
            throw createError.BadRequest()
        }

        let result = await new User(validatedResult).save()

        result.accessToken = await jwtUtil.signToken({ email : result.email})

        const response = {
            id : result._id,
            first_name : result.first_name,
            last_name : result.last_name,
            access_token : result.accessToken
        }

        res.status(201).send({
            status : "success",
            data : response
        });

    } catch (error) {
        console.log(error.message)
        
        next(error)
    }
}

export const logInUser = async (req,res,next) => {
    try {
        const validationResult = await schemaValidation.userLogin.validateAsync(req.body)
        
        let {email,password} = validationResult

        let user = await User.findOne({email : email})

        if(!user){
            throw new createError.NotFound("user not registered")
        }

        const isUserPasswordMatch = await user.isValidPassword(password)

        if(!isUserPasswordMatch){
            throw createError.Unauthorized("username / password not valid")
        }

        console.log(user)

        user.accessToken = await jwtUtil.signToken({ email : user.email})

        let response = {
            id : user._id,
            access_token : user.accessToken,
        }

        res.status(200).send({
            status : "success",
            data : response
        });

    } catch (error) {
        console.log(error.message)
        
        if(error.isJoi){
            return next(createError.BadRequest("invalid username / password"))
        }
        
        next(error)
    }
}

export const editUser = async (req,res,next) => {
    try {
        const validatedUserId = await schemaValidation.userId.validateAsync(req.params)
        
        const validatedUserDetails = await schemaValidation.editUser.validateAsync(req.body)

        if(!validatedUserId || !validatedUserDetails){
            let errorMessage = !validatedUserId ? validatedUserId.message : validatedUserDetails.message
            throw createError.BadRequest(errorMessage)
        }

        const user = await User.find({_id : validatedUserId.id }, "-__v -_id")

        if(!user){
            throw createError.NotFound("user not found")
        }

        console.log(user)

        let itemsToUpdate = {}

        //get the query projection i.e items to update
        for(const item in validatedUserDetails){
            itemsToUpdate[item] = validatedUserDetails[item] 
        }

        console.log("items : " + JSON.stringify( itemsToUpdate))

        let updatedResult = await User.updateOne({_id : validatedUserId.id}, itemsToUpdate)

        res.status(201).send({
            status : "success",
            data : itemsToUpdate
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}

export const logOutUser = async (req,res,next) => {
    try {
        

    } catch (error) {
        
    }
}

