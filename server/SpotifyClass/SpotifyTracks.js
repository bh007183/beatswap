export default class SpotifyTracks{
    constructor(authorization) {
        this.trackData = {}
        this.authorization = authorization;
       
      }

      async setTracks(initData) {
        console.log(initData.tracks)
        this.counter ++
        if(this.trackData[initData.name]){
        this.trackData[initData.name].push(initData.tracks.items)
        }else{
            this.trackData[initData.name] = initData.tracks.items
        }
        
        try {
          if (initData.tracks.next) {
            let { data } = await axios({
              url: initData.tracks.next,
              method: "GET",
              headers: {
                Authorization: this.authorization,
              },
            });
             setTimeout(async() => {
                return await this.setTracks(data);
            }, 1000);
            
          }
       
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
      get tracks(){
        console.log(this.trackData)
        return this.trackData;
      }
}