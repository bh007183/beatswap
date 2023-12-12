import express from "express"
import axios from "axios"
import spotifyPlaylists from "./playlistRoutes.js"
import codeVerifyer from "./codeVerifyer.js"
import spotifyTracks from "./trackRoutes.js"
const router = express.Router()


router.use("/codeverifyer", codeVerifyer)
router.use("/playlists", spotifyPlaylists)
router.use("/playlists/tracks", spotifyTracks)


export default router