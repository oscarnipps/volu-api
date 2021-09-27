import jwt from 'jsonwebtoken'
import config from '../config.js'
import createError from 'http-errors'

export const verifyAuthToken = (req,res,next) => {
    const accessToken = req.header('Authorization')

    console.log(`access token : ${accessToken}`)

    if(!accessToken){
        next(createError.Unauthorized("Unauthorized access denied"))
        return
    }

    jwt.verify(accessToken,config.access_token_secret, (error,payload) => {
        if(error){

            console.log(`error  : ${error.message}`)
            
            switch (error.name) {
            
                case 'TokenExpiredError':
                    return next(createError.Unauthorized("Access denied , token expired"))

                case 'JsonWebTokenError':
                    return next(createError.Unauthorized("Invalid token format"))
            
                default:
                    return next(createError.Unauthorized("Invalid token format"))
            }
        }
       
        //access in route if needed
        req.payload = payload
        
        next()
    })


}