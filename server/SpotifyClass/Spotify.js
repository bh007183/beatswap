import axios from "axios"

export default class Spotify {


    constructor(playlistData, authorization){
        this.playlistData = playlistData
        this.authorization = authorization
        this.playlists = []
    }

    async GetOtherPlaylists(){

        this.playlists = [...this.playlists, ...this.playlistData.items]
        if(this.playlistData.next){
            
            let {data} = await axios({
                url: this.playlistData.next,
                method: "GET",
                headers: {
                    Authorization: this.authorization
                }
            })
            // this.playlists = [...this.playlists, ...data.items]
            this.playlistData = data
            await this.GetOtherPlaylists()
        }else{
            
            return this.playlists
        }
      
        
        
        
    } 
    
}
