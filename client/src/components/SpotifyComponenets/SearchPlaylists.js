import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsSongs } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function SearchPlaylists() {
    const dispatch = useDispatch()
    const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
    const PlaylistsNextURL = useSelector(state => state.Store.Spotify.PlaylistsNextURL)

    useEffect(() => {
     dispatch(getUsersPlaylists(PlaylistsNextURL,AccessToken))
    }, [PlaylistsNextURL])
    
  return (
    <div>SearchPlaylists</div>
  )
}
