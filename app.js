import config from './config.js'
import {router as userRouter} from './routes/user.routes.js'
import express from 'express'
import mongoose from 'mongoose'

const app = express();

app.use(express.json());
app.use('/user',userRouter);

mongoose.connect(config.db_uri,{
    dbName : config.db_name,
    pass : config.db_pasword,
    user : config.db_user,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>{
    console.log(`mongodb conncted with database name : ${config.db_name}`) 
})



//error handler
app.use((error,req,res,next) => {
    let statusCode = error.status || 500

    let message = error.message || "internal server error"

    res.status(statusCode).send({
        "message" : message
    })
})

app.listen(config.port, () => {
    console.log(`running on ${config.environment} server and port ${config.port}`)
})