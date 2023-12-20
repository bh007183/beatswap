import axios from "axios";
import * as fs from "fs";

export default class Deezer {
  constructor(spotifyData) {
    this.spotifyData = spotifyData;
    this.tracks = [];
    this.authorization = "frTP071SMOrDrQ7t9MiXMs0ZfgFZNL1y5PfRvDm8nvbuXpQFN5t";
  }
//Searches Deezer Library for spotify matching track
  async searchForTracks() {

    try {
      //this.spotifyData
      for (const v of JSON.parse(fs.readFileSync("./spotifyData.json"))) {
        let obj = {
          playlistName: v.playlistName,
          tracks: [],
          tracksNotFound: [],
        };
        for (const song of v.trackData) {
          if (song.track) {
            // console.log(song);
            await setTimeout(() => {}, 1000);
            let result = await axios({
              url: `https://api.deezer.com/search?q=artist:"${song.track.artists[0].name}"%album:"${song.track.album.name}"%track:"${song.track.name}"`,
              method: "GET",
            });
  TODO: //need to adjust for precise matching as there are some not matches getting ins
            if (result.data.total > 0) {
              obj.tracks.push(result.data.data[0]);
            } else {
              obj.tracksNotFound.push({
                artist: song.track.artists[0].name,
                album: song.track.album.name,
                track: song.track.name,
              });
            }
          }
        }
        console.log(obj)
        this.tracks.push(obj);
      }
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
    console.log(this.tracks);
    // TODO: //Bring this back in for testingd // this.addData()
  }

  async createPlaylistAddTracks(){
    
    for(const v of this.tracks){
      ///create playlist v.playlistName
      let results = await axios({
        url:`https://api.deezer.com/user/me/playlists?access_token=${this.authorization}&title=${v.playlistName}`,
        method: "POST"
      })
      let idString = ''
       for(const track of v.tracks){
        idString += track.id + ","
       }

       let tracksAdded = await axios({
        url:`https://api.deezer.com/playlist/${results.data.id}/tracks?access_token=${this.authorization}&songs=${idString}`,
        method: "POST"
      })
      console.log(results.data)
      console.log(idString)
      

          

  
  
  }
  console.log("done")
}

}

 new Deezer().searchData()