import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken} from '../../store/spotifyActions';
import { initSpotifyLogin } from './tools';

export default function Spotify() {

  const dispatch = useDispatch()


let token = useSelector((state) => state.Store.Spotify.spotifyTokenData.access_token)





  // const clientId = "your_client_id";
  // const params = new URLSearchParams(window.location.search);
  // const code = params.get("code");
  
  // if (!code) {
  //     redirectToAuthCodeFlow(clientId);
  // } else {
  //     const accessToken = await getAccessToken(clientId, code);
  //     const profile = await fetchProfile(accessToken);
  //     populateUI(profile);
  // }
    

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      initSpotifyLogin();
      } else {
      
    dispatch(getAccessToken("29cca2853fe440a39cef14b5db0a9e44", code))
      }
      
    }, [])
    
  return (
    <div>Spotify
      {/* <button onClick={e => dispatch(fetchProfile(token))}></button> */}
    </div>
  )
}
