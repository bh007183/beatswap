import express from "express";
import axios from "axios";
const router = express.Router();
import * as fs from "fs";

//Route to authenticate user and see if they accept permission to access there data.
router.get("/:code", async (req, res) => {
  try{
    let accessTokenObj = await axios.get(
      `https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.APPID}&secret=${process.env.SECRETKEY}&code=${req.params.code}&output=json`
    );
  
    let playlistData = await axios.get(
      `https://api.deezer.com/user/me/playlists?access_token=${accessTokenObj.data.access_token}`
    );
  
    ///ACCESS HAS BEEN GRANTED NOW QUERRING ALL PLAYLISTS AND SONGS AND PUTTING THEM INTO VARIABLE combinedData
    let playlists = await Promise.all(
      playlistData.data.data.map((v, i) => {
        //  console.log(v.link.replace('www', 'api') + "&limit=300")
        return axios.get(v.link.replace("www", "api") + "&limit=300");
      })
    );
  
    let combinedData = playlists.map((v, i) => {
      return {
        playlistName: v.data.title,
        nb_tracks: v.data.nb_tracks,
        trackData: v.data.tracks.data.map((v, i) => {
          return {
            name: v.title,
            titleShort: v.title_short,
            artists: [v.artist.name],
            album:{
                name: v.album.title
            } ,
          };
        }),
      };
    });
  
    res.json({combinedData, accessToken:accessTokenObj.data.access_token});
  }catch(err){
    throw Error(err)
  }
  
});



export default router;
