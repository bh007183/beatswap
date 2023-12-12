import axios from "axios";

export default class SpotifyPlaylist {
  constructor(authorization) {
    this.playlistData = [];
    this.trackData = []
    this.authorization = authorization;
    this.counter = 0
  }

  async setPlaylists(initData) {
    this.counter ++
    this.playlistData = [...this.playlistData, ...initData.items];
    try {
      if (initData.next) {
        let { data } = await axios({
          url: initData.next,
          method: "GET",
          headers: {
            Authorization: this.authorization,
          },
        });
        return await this.setPlaylists(data);
      }
   
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  get playlists() {
    return this.playlistData;
  }
}