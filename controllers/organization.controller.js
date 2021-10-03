import createError from 'http-errors'
import Organization from "../models/Organization.model.js"
import * as schemaValidation from '../util/validation/organizationValidationSchema.js'

export const createOrganization = async (req,res,next) => {
    try {
        const validatedResult = await schemaValidation.organization.validateAsync(req.body);
        
        if(validatedResult.error){
            throw createError.BadRequest()
        }

        let result = await new Organization(validatedResult).save()

        res.status(201).send({
            status : "success",
            data : result
        });

    } catch (error) {
        console.log(error.message)
        
        next(error)
    }
}