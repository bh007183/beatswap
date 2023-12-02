import express from "express"
import axios from "axios"
const router = express.Router()

router.get("/", async (req,res) => {


    let data = await axios.get(`https://connect.deezer.com/oauth/auth.php?app_id=651351&redirect_uri=http://localhost:3000/deezer&perms=basic_access,email`)
  
    res.send(data.data)
})

export default router