import createError from 'http-errors'
import Organization from "../models/Organization.model.js"
import * as schemaValidation from '../util/validation/organizationValidationSchema.js'
import * as jwtUtil from '../util/jwtUtil.js'

export const createOrganization = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.organization.validateAsync(req.body);
        
        if(validatedResult.error){
            throw createError.BadRequest()
        }

        let result = await new Organization(validatedResult).save()

        let accessToken = await jwtUtil.signOrganizationToken({ 
            email : result.email ,
            id : result._id,
            name : result.name
        })
        
        console.log(`access token : ${result.accessToken}`)
        
        let response = {
            id : result._id,
            name : result.first_name,
            access_token : accessToken
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

        let organization = await Organization.findOne({email : email})

        if(!organization){
            throw new createError.NotFound("organization not registered")
        }

        const isUserPasswordMatch = await organization.isValidPassword(password)

        if(!isUserPasswordMatch){
            throw createError.Unauthorized("username / password not valid")
        }

        console.log(organization)

        organization.accessToken = await jwtUtil.signOrganizationToken({ 
            email : organization.email ,
            id : organization._id,
            name : organization.name
        })

        // organization.accessToken = await jwtUtil.signOrganizationToken({ email : organization.email})

        let response = {
            id : organization._id,
            access_token : organization.accessToken,
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