import axios from 'axios'
import express from 'express'
import DeezerRoutes from "./Routes/Deezer/index.js"
import SpotifyRoutes from "./Routes/index.js"
import cors from 'cors'

import "dotenv/config.js";

const app = express()
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(express.static("public"))

//API Routes
app.use("/deezer", DeezerRoutes)
app.use("/api", SpotifyRoutes)

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });

