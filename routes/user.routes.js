import express from 'express'
import UserModel from '../models/User.model.js'

const router = express.Router()

router.get("/", (req,res) => {

    let user = {
        name : "oscar josh",
        password : "kevindurant7"
    }

    console.log(`user name : ${user.name} and password : ${user.password}`)

    res.status(200).send(user)

})

//regitser user
router.post("/register", async (req,res,next) => {

    try {
        let userModel = new UserModel({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            sex : req.body.sex,
            email : req.body.email,
            phone : req.body.phone,
            password : req.body.password,
        });
    
       const result = await userModel.save();

       console.log(JSON.stringify(result));

       res.status(201).send(JSON.stringify(result));

    } catch (error) {
        console.log(error.message)

        error.status = 400

       next(error)
    }
    
})

//delete user

//login user

//edit user


export {router}





