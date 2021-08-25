import {router} from './routes/user.routes'
import express from 'express'

const app = express();

app.use(router)


app.listen(8000, () => {
    console.log("server is running")
})