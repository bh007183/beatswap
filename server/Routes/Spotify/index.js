import express from "express"
import axios from "axios"
import spotifyPlaylists from "./getRoutes.js"
import codeVerifyer from "./codeVerifyer.js"

const router = express.Router()


router.use("/codeverifyer", codeVerifyer)
router.use("/get", spotifyPlaylists)



export default router