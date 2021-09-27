import config from './config.js'
import {router as userRouter} from './routes/user.routes.js'
import {router as eventRouter} from './routes/events.routes.js'
import {router as eventCatgeoryRouter} from './routes/eventsCategory.routes.js'
import express from 'express'
import morgan from 'morgan'
import Joi from 'joi'
import './initMongoDb.js'

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use('/user',userRouter);

app.use('/event-categories',eventCatgeoryRouter);

app.use('/events',eventRouter);

//general error handler
app.use((error,req,res,next) => {
    console.log(error)

    console.log(error.status)

    if(error instanceof Joi.ValidationError){
        error.status = 400
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