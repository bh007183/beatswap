import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsSongs } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import SearchTracks from './SearchTracks'
export default function SearchPlaylists() {
    const dispatch = useDispatch()
    const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
    const PlaylistsNextURL = useSelector(state => state.Store.Spotify.PlaylistsNextURL)
    const Playlists = useSelector(state => state.Store.Spotify.Playlists)

    useEffect(() => {
      try{
        dispatch(getUsersPlaylists(PlaylistsNextURL,AccessToken))
      }catch(err){
        console.log(err)
      }
     
    }, [PlaylistsNextURL])
    
  return (
    <div>{Playlists.map((v,i) => <SearchTracks playlist={v} key={i}/>)}</div>
  )
}
