import config from './config.js'
import {router as userRouter} from './routes/user.routes.js'
import express from 'express'
import morgan from 'morgan'
import Joi from 'joi'
import './initMongoDb.js'

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use('/user',userRouter);

//general error handler
app.use((error,req,res,next) => {
    console.log(error)

    if(error instanceof Joi.ValidationError){
        error.status = 400
    }else{
        error.status = 500
    }

    let statusCode = error.status || 500

    let message = error.message || "internal server error"

    res.status(statusCode).send({
        "status" : "fail",
        "message" : message
    })
})

app.listen(config.port, () => {
    console.log(`running on ${config.environment} server and port ${config.port}`)
})