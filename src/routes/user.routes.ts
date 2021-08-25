import express from 'express'

const router = express.Router()

router.get("/user", (req,res) => {

    let user = {
        name : "oscar josh",
        password : "kevindurant7"
    }

    console.log(`user name : ${user.name} and password : ${user.password}`)

    res.status(200).send(user)

})

//regitser user

//logout user

//login user



export {router};





