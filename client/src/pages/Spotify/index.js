import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken} from "../../store/spotifyActions";
import { initSpotifyLogin } from "./tools";
import SearchPlaylists from "../../components/SpotifyComponenets/SearchPlaylists";


export default function Spotify() {
  const dispatch = useDispatch();

  let AccessToken = useSelector((state) => state.Store.Spotify.AccessToken);
  let Playlists = useSelector(state => state.Store.Spotify.Playlists)




  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      initSpotifyLogin();
    } else {
      dispatch(getAccessToken("29cca2853fe440a39cef14b5db0a9e44", code));
    }
  }, []);


  


 if (AccessToken){
    
    return <SearchPlaylists/>
  }



  return (
    <div>
      Login Spotify
      {/* <button onClick={e => dispatch(fetchProfile(token))}></button> */}
    </div>
  );
}
