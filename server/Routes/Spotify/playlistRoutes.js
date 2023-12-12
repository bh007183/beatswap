import express from "express";
import axios from "axios";
import Spotify from "../../SpotifyClass/Spotify.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { data } = await axios({
      url: "https://api.spotify.com/v1/users/me/playlists?limit=50",
      method: "GET",
      headers: {
        Authorization: req.headers.authorization,
      },
    });
    let spotify = new Spotify(req.headers.authorization);

    await spotify.setPlaylists(data);
    res.json(spotify.playlists);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

export default router;
