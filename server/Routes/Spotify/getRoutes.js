import express from "express";
import axios from "axios";
import SpotifyPlaylist from "../../SpotifyClass/SpotifyPlaylist.js";
import SpotifyTracks from "../../SpotifyClass/SpotifyTracks.js";
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
    // fs.writeFileSync("./spotifyData.json",JSON.stringify(playlistsWithSongs))
    res.json(playlistsWithSongs);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

export default router;