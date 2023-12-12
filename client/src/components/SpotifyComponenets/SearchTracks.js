import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsTracks } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { spotifyGetSongsFromPlaylists } from '../../pages/Spotify/tools'




export default function SearchTracks({playlist}) {
    const dispatch = useDispatch()
    const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
    const Playlists = useSelector(state => state.Store.Spotify.Playlists)
    useEffect(() => {
      
    
      dispatch(getUsersPlaylistsTracks(AccessToken, Playlists))
      
      
    }, [])

    // useEffect(() => {
      
    //    try{
    //     dispatch(getUsersPlaylistsTracks(TracksNextURL, AccessToken))
    //    }catch(err){
    //     console.log(err)
    //    }
      
      
      
    // }, [TracksNextURL])



  return (
    <div>
        {playlist.name}
       
    </div>

  )
}
