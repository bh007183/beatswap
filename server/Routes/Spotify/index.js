import express from "express"
import axios from "axios"
import spotifyPlaylists from "./getRoutes.js"
import codeVerifyer from "./codeVerifyer.js"

const router = express.Router()


router.use("/codeverifyer", codeVerifyer)
router.use("/get", spotifyPlaylists)



export default router

// let result = await axios.get({
//     url: `https://api.spotify.com/v1/search?q=artist%${song.track.artists[0].name}album%${song.track.album.name}track%${song.track.name}`,
//     method: "GET",
//     // headers: {
//     //     Authorization: this.authorization,
//     //   },
//   });