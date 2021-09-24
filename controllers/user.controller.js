
import UserModel from '../models/User.model.js'
import * as schemaValidation from '../util/validation/userValidationSchema.js'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import config from '../config.js'


export const registerUser = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.userRegistration.validateAsync(req.body);
        
        console.log(validatedResult);
        
        if(validatedResult.error){
            throw createError.BadRequest()
        }

        let result = await new UserModel(validatedResult).save()

        let options = {
            expiresIn : '1h',
            issuer : 'volu',
            audience : validatedResult.email,
        }

        let accessToken = jwt.sign(req.body, config.secret_key, options)

        console.log(accessToken)

        res.status(201).send({
            status : "success",
            data : result
        });

    } catch (error) {
        console.log(error.message)
        
        next(error)
    }
}

export const logInUser = async (req,res,next) => {
    try {
        const validationResult = await schemaValidation.userLogin.validateAsync(req.body)

        if(validationResult.error){
            throw new createError.BadRequest()
        }

        console.log(validationResult)
        
        let options = {
            expiresIn : '1h',
            issuer : 'volu',
            audience : validationResult.email,
        }

        let accessToken = jwt.sign(req.body, config.secret_key, options)

        console.log(accessToken)

        let response = req.body

        response.accessToken = accessToken

        res.status(200).send({
            status : "success",
            data : response
        });

    } catch (error) {
        console.log(error.message)

        next(error)
    }
}

