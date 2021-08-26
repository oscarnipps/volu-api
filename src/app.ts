import config from './config'
import {router as userRouter} from './routes/user.routes'
import express from 'express'
import mongoose from 'mongoose'

const app = express();

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
    console.log(`mongodb conncted with database name :  ${config.db_name}`) 
})

app.listen(config.port, () => {
    console.log(`running on ${config.environment} server and port ${config.port}`)
})