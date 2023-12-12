import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { getUsersPlaylists, getUsersPlaylistsTracks } from '../../store/spotifyActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { spotifyGetSongsFromPlaylists } from '../../pages/Spotify/tools'


export default function NavBar() {
  const dispatch = useDispatch()
  const AccessToken = useSelector(state => state.Store.Spotify.AccessToken)
  const Playlists = useSelector(state => state.Store.Spotify.Playlists)
  return (
    <Stack spacing={2} direction="row">
        <Link to="/deezer">
      <Button variant="text">Deezer</Button>
      </Link>
      <Button variant="contained">Contained</Button>
      <Button onClick={(e) => dispatch(getUsersPlaylistsTracks(AccessToken, Playlists))} variant="outlined">Tracks</Button>
    </Stack>
  );
}