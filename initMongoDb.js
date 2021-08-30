import mongoose from 'mongoose'
import config from './config.js'

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
}).catch((error) => {
    console.log(`error connecting to mongo database with message : ${error.message}`);
});

mongoose.connection.on('connected',()=> {
    console.log("mongoose connected to db")
});

mongoose.connection.on('error',(error)=> {
    console.log(`error connecting mongoose to database with message : ${error.message}`)
});

//disconnect mongoose just before the process is interrupted
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
