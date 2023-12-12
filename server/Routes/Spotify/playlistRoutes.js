import express from "express"
import axios from "axios"
import Spotify from "../../SpotifyClass/Spotify.js"
const router = express.Router()


router.get("/", async (req,res) => {
   try{
    
    let {data} = await axios({
        url:"https://api.spotify.com/v1/users/me/playlists?limit=50",
        method: "GET",
        headers: {
            Authorization: req.headers.authorization
        }
    })
     
     let compile = new Spotify(data, req.headers.authorization)
     console.log("start")
     console.log(await compile.GetOtherPlaylists().playlists)
     console.log("test")
     
     res.status(200).json(compile)
   }catch(err){
    console.log(err)
    res.json(err)
   }

   
})


export default router