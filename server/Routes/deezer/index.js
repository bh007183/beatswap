import express from "express"
import axios from "axios"
const router = express.Router()

//Deezer API Route To Initialize Deezer API Login
router.get("/api", async (req,res) => {
    let data = await axios.get(`https://connect.deezer.com/oauth/auth.php?app_id=651351&redirect_uri=http://localhost:3001/deezer&perms=basic_access,email,manage_library,delete_library`)
    data ? res.status(200).json(data.config.url) : res.sendStatus(404)
})


//Route to authenticate user and see if they accept permission to access there data.
router.get("/", async (req,res) => {

    
    if(res.req.query.code){

    }else{
        res.status(302).json({message: "As you selected refuse, you will not be permited to use this application because you did not grant permission to this app to use your information"})
    }

    //
    await console.log(res.req.query.code)

    // let token = await axios.get(`https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.APPID}&secret=${process.env.SECRETKEY}&code=${res.req.query.code}`)


    
     res.status(200).redirect(`https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.APPID}&secret=${process.env.SECRETKEY}&code=${res.req.query.code}&output=json`)
    })//


export default router