import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";
import { SpotifyIterativeSlowed } from "../pages/Spotify/tools";
import axios from "axios";
import {spotifyGetSongsFromPlaylists} from "../pages/Spotify/tools"

export const slice = createSlice({
  name: "Spotify",
  initialState: {
    Index: 0,
    Code: undefined,
    Error: "",
    AccessToken: undefined,
    DoneLoading: false,
    Playlists: [],
    PlaylistsWTracks:[],
    PlaylistsNextURL: "https://api.spotify.com/v1/me/playlists?limit=50",
    TracksNextURL: null
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
      Spotify.Playlists = [...Spotify.Playlists, ...action.payload.items]
      if(action.payload.next !== null){
        Spotify.PlaylistsNextURL = action.payload.next
      }else{
        Spotify.DoneLoading = true
        Spotify.TracksNextURL = Spotify.Playlists[0].href
      }
      
    },
    setTracks:(Spotify, action) => {

      Spotify.PlaylistsWTracks = [...Spotify.PlaylistsWTracks, ...action.payload]
      if(action.payload.next !== null){
        Spotify.PlaylistsNextURL = action.payload.next
      }

      Spotify.TracksNextURL = action.payload.next
      
    }
  }
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
    url: "https://accounts.spotify.com/api/token",
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

  export const getUsersPlaylists = (url,token) => apiCallBegan({
    url,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    onSuccess: setPlaylists.type,
    onError: setSpotifyError.type
  })

  export const getUsersPlaylistsTracks = (url,token) => apiCallBegan({
    url,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    onSuccess: setTracks.type,
    onError: setSpotifyError.type
  })


//if 429  error then hit to many api requests and return header should have a Retry-After value.
