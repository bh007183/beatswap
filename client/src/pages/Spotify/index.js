import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken, getUsersPlaylists, getUsersNextPlaylist } from "../../store/spotifyActions";
import { initSpotifyLogin } from "./tools";
import SearchPlaylists from "../../components/SpotifyComponenets/SearchPlaylists";
import SearchTracks from "../../components/SpotifyComponenets/SearchTracks";

export default function Spotify() {
  const dispatch = useDispatch();

  let AccessToken = useSelector((state) => state.Store.Spotify.AccessToken);
  let Playlists = useSelector(state => state.Store.Spotify.Playlists)
  let DoneLoading = useSelector(state => state.Store.Spotify.DoneLoading)


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      initSpotifyLogin();
    } else {
      dispatch(getAccessToken("29cca2853fe440a39cef14b5db0a9e44", code));
    }
  }, []);


  // useEffect(() => {
    
  // }, [DoneLoading])
  


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
