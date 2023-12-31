import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";


export const slice = createSlice({
  name: "Spotify",
  initialState: {
    Code: undefined,
    Error: "",
    AccessToken: undefined,
    DoneLoading: false,
    Playlists: [],
  
  },
  reducers: {
    setSpotifyPlaylists: (Spotify, action) => {
      console.log(action);
      Spotify.SpotifyPlaylists = action.payload;
    },

    setSpotifyError: (Spotify, action) => {
      Spotify.Error = action.payload;
    },

    setTokenData: (Spotify, action) => {
      Spotify.AccessToken = action.payload.access_token;
      //After Token is set, call get User Playlists to set that data.
    },

    setProfileData: (Spotify, action) => {
      console.log(action.payload);
      Spotify.spotifyProfileData = action.payload;
    },

    setPlaylists: (Spotify, action) => {
      Spotify.Playlists = action.payload
      
      
    },
    setTracks:(Spotify, action) => {
      let obj = {
        name:action.payload.name,
        tracks: action.payload.tracks.items
      }
      console.log(action.payload)
      Spotify.PlaylistsWTracks = [...Spotify.PlaylistsWTracks, obj]
      if(action.payload.tracks.next !== null){
        Spotify.TracksNextURL = action.payload.tracks.next
      }
      
    }
  },

});
export const {
  setSpotifyPlaylists,
  setSpotifyError,
  setTokenData,
  setProfileData,
  setCode,
  setPlaylists,
  setTracks
} = slice.actions;
export default slice.reducer;

export const getAccessToken = (clientId, code) =>
  apiCallBegan({
    
    url: "http://localhost:3001/api/spotify/codeverifyer",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/spotify",
      code_verifier: localStorage.getItem("verifier"),
    },
    onSuccess: setTokenData.type,
    onError: setSpotifyError.type,
  });

  export const getUsersPlaylists = (token) => apiCallBegan({
    url: "http://localhost:3001/api/spotify/get",
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    onSuccess: setPlaylists.type,
    onError: setSpotifyError.type
  })

  

  //https://api.spotify.com/v1/me/playlists
  export const createPlaylists = (url,token) => apiCallBegan({
    url,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    onSuccess: setTracks.type,
    onError: setSpotifyError.type
  })

  

//if 429  error then hit to many api requests and return header should have a Retry-After value.
