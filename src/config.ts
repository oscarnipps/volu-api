import * as dotenv from 'dotenv'
dotenv.config()

export default{
    port : process.env.PORT ,
    environment : process.env.NODE_ENV,
    db_name : process.env.DB_NAME,
    db_user : process.env.DB_USER,
    db_pasword : process.env.DB_PASSWORD,
    db_uri : process.env.DB_URI ?? ''
}

