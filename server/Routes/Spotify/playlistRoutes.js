import express from "express";
import axios from "axios";
import SpotifyPlaylist from "../../SpotifyClass/SpotifyPlaylist.js";
import SpotifyTracks from "../../SpotifyClass/SpotifyTracks.js";
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
    let spotifyPlaylist = new SpotifyPlaylist(req.headers.authorization);

    await spotifyPlaylist.setPlaylists(data);


   axios({
      url: spotifyPlaylist.playlists[11].href,
      method: "GET",
      headers: {
        Authorization: req.headers.authorization,
      },
    }).then(({data}) => {
     


      let spotifyTracks = new SpotifyTracks(req.headers.authorization)
      
      console.log(data)
  
  
      spotifyTracks.setTracks(data)
      console.log(spotifyTracks.tracks)
    });

  
    // res.json(spotify.playlists);

   

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

export default router;
