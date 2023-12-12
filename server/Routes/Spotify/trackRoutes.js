import express from "express";
import axios from "axios";
import Spotify from "../../SpotifyClass/SpotifyPlaylist.js";
const router = express.Router();

router.post("/", async (req, res) => {
    console.log(req.body)
    req.body.playlists.forEach(v => {



        setTimeout(async () => {
            try {
                let { data } = await axios({
                  url: v.href,
                  method: "GET",
                  headers: {
                    Authorization: req.headers.authorization,
                  },
                });
               console.log(data)
            
              } catch (err) {
                console.log(err);
                res.json(err);
              }
            
        }, 1000);
        
        
    });
 
});

export default router;
