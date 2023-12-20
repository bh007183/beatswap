import express from "express";
import axios from "axios";
import SpotifyPlaylist from "../../SpotifyClass/SpotifyPlaylist.js";
import SpotifyTracks from "../../SpotifyClass/SpotifyTracks.js";
import SpotifySearch from "../../SpotifyClass/SpotifySearch.js"
import * as fs from "fs"
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { data } = await axios({
      url: "https://api.spotify.com/v1/me/playlists?limit=50",
      method: "GET",
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    let spotifyPlaylists = new SpotifyPlaylist(req.headers.authorization);
    await spotifyPlaylists.setPlaylists(data);
  //////////////////////////////////////////////////////////////////////
  //FOR EACH PLAYLIST GET THE TRACKS AND PUSH RESULTS INTO PLAYLISTSWITHSONGS
  //THEN RETURN PLAYLISTS WITH SONGS
   
    let playlistsWithSongs = []
    for(const v of spotifyPlaylists.playlists){
      let spotifyTracks = new SpotifyTracks(req.headers.authorization, v.name)
      let trackData = await axios({
         url: v.tracks.href + "?fields=next,total,items(track(album(name))),items(track(artists(name))),items(track(external_ids)),items(track(name))",
         method: "GET",
         headers: {
           Authorization: req.headers.authorization,
         },
       })
       await spotifyTracks.setTracks(trackData.data)
       playlistsWithSongs.push(spotifyTracks)
    }
    fs.writeFileSync("./spotifyData.json",JSON.stringify(playlistsWithSongs))
   
    res.json(playlistsWithSongs);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
router.get("/search", async (req, res) => {
  fetch("https://api.spotify.com/v1/search?q=artist%Sılaalbum%Yeni Ay%Screen&type=track").then((response) => {
    console.log(response)
    return response.json()
  }).then((data) => {
    console.log(data)
    res.json(data)
  }).catch(err => console.log(err.message))
  // try{
  //   let result = await axios({
  //     url: "https://api.spotify.com/v1/search?q=artist%21 Pliotsalbum%Blurryfacetrack%Screen&type=track",
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer BQCtzOV7Ja_1oBoeNcr9t5q1Kl_MbA6Qy5PxvwLvBO_XQzhbirAXXtG6gKc53Ai61SmY1WngS5c2WcDkboo2C4kLtDJbLsrDA7MmQgkZiqOaA0duMwBmZmqAae5-zxR11FVqVPvnreJSgceqKSEp1WfCwxtLutK4hSThbwLIA5ou3CpUmpkiiPYGYvCfe05_1mJSKmSxO-O--VfstGv1vFbO4WtaW9uxkLJC40P3zfdHx2cU9uUDQ_rp09Lr",
  //     },
  //   });
  //   res.json(result)
  // }catch(err){
  //   res.json(err)
  // }
  
  
})

export default router;
