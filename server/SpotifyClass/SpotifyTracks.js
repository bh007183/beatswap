import axios from "axios";
export default class SpotifyTracks {
  #authorization;
  constructor(authorization, playlistName) {
    this.playlistName = playlistName;
    this.trackData = [];
    this.#authorization = authorization;
  }

  async setTracks(initData) {
    this.trackData = [...this.trackData, ...initData.items];
    try {
      if (initData.next) {
        let { data } = await axios({
          url: initData.next  + "?fields=next,total,items(track(album(name))),items(track(artists(name))),items(track(external_ids)),items(track(name))",
          method: "GET",
          headers: {
            Authorization: this.#authorization,
          },
        });
        setTimeout(async () => {
          return await this.setTracks(data);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  get tracks() {
    return this.trackData;
  }

  async assignTracksToPlaylists() {}
}
