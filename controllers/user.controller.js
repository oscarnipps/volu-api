
import UserModel from '../models/User.model.js'
import * as schemaValidation from '../util/userValidationSchema.js'
import createError from 'http-errors'


export const registerUser = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.userRegistration.validateAsync(req.body);
        
        console.log(validatedResult);
        
        if(validatedResult.error){
            throw createError.BadRequest()
        }

        let user = await UserModel.find({email : validatedResult.email})

        if(user){
            throw createError.Conflict("user with email already exists")
        }

        const result = await new UserModel(validatedResult).save();

        res.status(201).send({
            status : "success",
            data : result
        });

    } catch (error) {
        console.log(error.message)
        
        next(error)
    }
}

export const getUser = (req,res,next) => {

    let user = {
        name : "oscar josh",
        password : "kevindurant7"
    }

    console.log(`user name : ${user.name} and password : ${user.password}`)

    res.status(200).send(user)

}

