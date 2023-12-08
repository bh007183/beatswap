import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsSongs } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
export default function SearchPlaylists() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.Store.Spotify.AccessToken)

    useEffect(() => {
     dispatch(getUsersPlaylistsSongs(token))
    }, [])
    
  return (
    <div>SearchPlaylists</div>
  )
}
