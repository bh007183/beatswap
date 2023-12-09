import React from 'react'
import { getUsersPlaylists, getUsersPlaylistsTracks } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'



export default function SearchTracks() {
    const dispatch = useDispatch()
    const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
    const DoneLoading = useSelector(state => state.Store.Spotify.DoneLoading)
    const TracksNextURL = useSelector(state => state.Store.Spotify.TracksNextURL)
    const Playlists = useSelector(state => state.Store.Spotify.Playlists)
    useEffect(() => {
     dispatch(getUsersPlaylistsTracks(TracksNextURL,AccessToken))
    }, [TracksNextURL])
  return (
    <div>
        LoadingTracks
        {
              Playlists.map((v,i) => {

                
                  <div>v.name</div>

                  dispatch(getUsersPlaylistsTracks(TracksNextURL,AccessToken))
                

              })
        }
    </div>
    // <div>{
    //     !DoneLoading ? LoadingPlaylists:<SearchTracks/>
    // }
    // </div>
  )
}
