import express from "express"
import axios from "axios"
import spotifyRoutes from "./Spotify/index.js"
const router = express.Router()


router.use("/spotify", spotifyRoutes)


export default router