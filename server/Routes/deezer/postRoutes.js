import express from "express";
import Deezer from "../../DeezerClass/Deezer.js";
const router = express.Router();
import axios from "axios"

router.post("/", async (req, res)=> {
    try{
        let deez = new Deezer(req.body, req.headers.authorization)
        let data = await axios.get(`https://api.deezer.com/search?q=artist:"aloe blacc"%album:"Good Things"%track:"I need a dollar"`)
       console.log(data.data)
        res.json("buen")
    }catch(err){
        res.status(404)
        
    }

    



})

export default router