import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
 try{
    let {data} = await axios({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: req.body
      });
      console.log(data)
      res.status(200).json(data)


 }catch(err){
    console.log(err)
    res.json(err)

 }
  
});

export default router;
