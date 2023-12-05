import express from "express";
import axios from "axios";
const router = express.Router();

//Deezer API Route To Initialize Deezer API Login
router.get("/api", async (req, res) => {
  let data = await axios.get(
    `https://connect.deezer.com/oauth/auth.php?app_id=651351&redirect_uri=http://localhost:3001/deezer&perms=basic_access,email,manage_library,delete_library`
  );
  data ? res.status(200).json(data.config.url) : res.sendStatus(404);
});

//Route to authenticate user and see if they accept permission to access there data.
router.get("/", async (req, res) => {
  if (!res.req.query.code) {
    // res.render("/deezererror");
  }

  let accessTokenObj = await axios.get(
    `https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.APPID}&secret=${process.env.SECRETKEY}&code=${res.req.query.code}&output=json`
  );
  console.log(accessTokenObj.data);
  if (!accessTokenObj.data.access_token) {
    // res.render("/deezererror");
  }

  let playlistData = await axios.get(
    `https://api.deezer.com/user/me/playlists?access_token=${accessTokenObj.data.access_token}`
  );

  if (playlistData.data.data.length === 0) {
    res.status(404).json({ message: "Unable to find any deezer playlists" });
   
  }

  console.log(playlistData.data.data)
  ///ACCESS HAS BEEN GRANTED NOW QUERRING ALL PLAYLISTS AND SONGS AND PUTTING THEM INTO VARIABLE PLAYLISTS
  let playlists = await Promise.all(playlistData.data.data.map((v, i) => {

    console.log(v.link.replace('www', 'api') + "&limit=300")
    // return axios.get(v.link.replace('www', 'api') + "&limit=300");

  }));
//   console.log(playlists)
// (async function(){
//     for await (let val of playlists){
//         console.log(val)
//         // let allData = {
//         //     title: v.title,
//         //     length: songs.total,
//         //     songs: songs.data.map((v, i) => {
//         //       return {
//         //         title: v.title,
//         //         titleShort: v.title_short,
//         //         artist: v.artist.name,
//         //         album: v.album.title,
//         //       };
//         //     }),
//         //   };
//         //   return allData
//       }
// })
  
//   console.log(playlists)
});

export default router;
