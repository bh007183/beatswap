import axios from "axios";

export default class Deezer {
  constructor(data, authorization) {
    this.data = data;
    this.tracks = [];
    this.authorization = authorization;
  }

  async searchData() {
    try {
      for (const v of this.data) {
        let obj = {
          playlistName: v.playlistName,
          tracks: [],
        };
        for (const song of v.trackData) {
          let result = await axios.get({
            url: `https://api.deezer.com/search?q=artist:"${song.track.artists[0].name}"%album:"${song.track.album.name}"%track:"${song.track.name}"`,
          
            method: "GET",
            
          });

          obj.tracks.push(result);
        }
        this.tracks.push(obj);
      }
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  }
}
