import express from "express"
import axios from "axios"
import spotifyPlaylists from "./playlistRoutes.js"
const router = express.Router()


router.use("/s/api")


export default router