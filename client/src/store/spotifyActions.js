import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';

export const slice = createSlice({
name: 'Spotify',
initialState: {
 
  code: undefined,
  spotifyData:[],
  error: "",
  success:"",
  spotifyTokenData: {}
},
reducers: {
  
  addSpotifyData: (Spotify, action) => {
    console.log(action)
    Spotify.spotifyData = action.payload
  },

  setSpotifyError: (Spotify, action) => {
    Spotify.error = action.payload
  },

  setSpotifySuccess: (Spotify, action) => {
    Spotify.success = action.payload
  },

  setTokenData: (Spotify, action) => {
    Spotify.spotifyTokenData = action.payload
  },

  setProfileData: (Spotify, action) => {
    Spotify.spotifyProfileData = action.payload
    
  },
  setCode: (Spotify, action) => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    Spotify.code = code
  }



},
})
export const {addSpotifyData, setSpotifyError, setSpotifySuccess, setTokenData,setProfileData, setCode} = slice.actions
export default slice.reducer

export const getAccessToken = (clientId, code) => apiCallBegan({
  url:"https://accounts.spotify.com/api/token",
  method: "POST",
  headers:  {"Content-Type": "application/x-www-form-urlencoded"},
  data: {
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/spotify",
    code_verifier: localStorage.getItem("verifier"),
  },
    onSuccess: setTokenData.type,
    onError: setSpotifyError.type
  
})



export const getProfile = (token) => apiCallBegan({
  url: "https://api.spotify.com/v1/me",
  method:"GET",
  headers: { Authorization: `Bearer ${token}`},
  onSuccess: setProfileData.type,
  onError: setSpotifyError.type
})

export const getUsersPlaylists = (token) => apiCallBegan({
  url: "https://api.spotify.com/v1/users/me/playlists?limit=50",
  method:"GET",
  headers: { Authorization: `Bearer ${token}`},
  onSuccess: setProfileData.type,
  onError: setSpotifyError.type
})


