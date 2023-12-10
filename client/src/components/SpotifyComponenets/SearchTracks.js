import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsTracks } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { spotifyGetSongsFromPlaylists } from '../../pages/Spotify/tools'




export default function SearchTracks({playlist}) {
    const dispatch = useDispatch()
    const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
    const Index = useSelector(state => state.Store.Spotify.Index)
    const TracksNextURL = useSelector(state => state.Store.Spotify.TracksNextURL)
    const Playlists = useSelector(state => state.Store.Spotify.Playlists)
    useEffect(() => {
      
    
      dispatch(getUsersPlaylistsTracks(playlist.href, AccessToken))
      
      
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
