import axios from "axios";

export default class SpotifyPlaylist {
  #authorization;
  constructor(authorization) {
    this.playlistData = [];
    this.#authorization = authorization;
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
            Authorization: this.#authorization,
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
