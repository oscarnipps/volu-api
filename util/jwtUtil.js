import jwt from 'jsonwebtoken'
import config from '../config.js'

export const signToken = (payload) => {

    return new Promise((resolve,reject) => {

        let options = {
            expiresIn : '1h',
            issuer : 'volu',
            audience : payload.email
        }
        
        jwt.sign(payload, config.secret_key, options , (err,token)=> {
            if(err){
                reject(err)
            }
            
            resolve(token)
        })
    })
}