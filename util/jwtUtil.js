import jwt from 'jsonwebtoken'
import config from '../config.js'
import createError from 'http-errors'

export const signToken = (payload) => {

    return new Promise((resolve,reject) => {

        let options = {
            expiresIn : '15s',
            issuer : 'volu',
            audience : payload.email
        }
        
        jwt.sign(payload, config.access_token_secret, options , (err,token)=> {
            
            if(err){
                console.log(err.message)
                reject(createError.InternalServerError())
            }
            
            resolve(token)
        })
    })
}