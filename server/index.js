import axios from 'axios'
import express from 'express'
import deezerRoutes from "./Routes/deezer/index.js"
const app = express()
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"))

app.use("/deez", deezerRoutes)

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });

