import axios from "axios";
import * as fs from "fs";
export default class SpotifySearch {
  constructor(authorization) {
    this.data = JSON.parse(fs.readFileSync("./deezerData.json"));
    this.tracks = [];
    this.authorization = authorization;
  }

  async SearchSpotifyForTracks() {
    console.log(this.data)
    console.log(this.authorization)
    try {
      for (const v of this.data) {
        let obj = {
          playlistName: v.playlistName,
          tracks: [],
          tracksNotFound: [],
        };

        for (const song of v.trackData) {
          setTimeout(() => {}, 1000);
          let result = await axios({
            url: `https://api.spotify.com/v1/search?q=artist%${song.artists[0]}album%${song.album.name}track%${song.name}&type=track`,
            method: "GET",
            headers: {
              Authorization: this.authorization,
            },
          });

          if (result.data.tracks.total > 0) {
            obj.tracks.push(result.data.tracks.items[0]);
          } else {
            obj.tracksNotFound.push({
              artist: song.artists[0],
              album: song.album.name,
              track: song.name,
            });
          }
        }
        console.log(obj);
        this.tracks.push(obj);
      }
    } catch (err) {
      console.log(err);
    //   throw Error(err.data);
    }
    console.log(this.tracks);
  }
}


