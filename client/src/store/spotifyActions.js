import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";
import { SpotifyIterativeSlowed } from "../pages/Spotify/tools";
import axios from "axios";

export const slice = createSlice({
  name: "Spotify",
  initialState: {
    Code: undefined,
    SpotifyPlaylists: undefined,
    Error: "",
    AccessToken: undefined,
    SpotifyUser: "",
    isLoading: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersPlaylistsSongs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersPlaylistsSongs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(getUsersPlaylistsSongs.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = action.error.message;
    });
  },
});
export const {
  setSpotifyPlaylists,
  setSpotifyError,
  setTokenData,
  setProfileData,
  setCode,
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

export const getUsersPlaylistsSongs = createAsyncThunk(
  "Spotify/getUsersPlaylistsSongs",
  async (token) => {
    let playlists = await axios({
      url: "https://api.spotify.com/v1/me/playlists?limit=50",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    let allPlaylists = [...playlists.data.items];

    try {
      while (allPlaylists.length < playlists.data.total) {
        if (playlists.data.next === null) {
          allPlaylists = [...allPlaylists, ...playlists.data.items];
        } else {
          let newPlaylists = await axios({
            url: playlists.data.next,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          allPlaylists = [...allPlaylists, ...newPlaylists.data.items];
          playlists = newPlaylists;
        }
      }
    } catch (err) {
      console.log(err);
    }
   console.log(allPlaylists);
   
    let counter = 0;


    let interval = setInterval(async () => {
      let allSongs = [];
      if (counter < allPlaylists.length) {
        if (counter === allPlaylists.length) {
          console.log(allPlaylists)
          clearInterval(interval);
          console.log(allPlaylists)
        }
        console.log(allPlaylists[counter].tracks.href);

        try {
          let songs = await axios({
            url: allPlaylists[counter].tracks.href,
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(songs)
          try {
            while (allSongs.length < songs.data.total) {
              if (songs.data.next === null) {
                allSongs = [...allSongs, ...songs.data.items];
              } else {
                let newSongs = await axios({
                  url: songs.data.next,
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}` },
                });
                allSongs = [...allSongs, ...newSongs.data.items];
                songs = newSongs;
              }
            }
          } catch (err) {
            console.log(err);
          }
          allPlaylists[counter]["songs"] = allSongs
          console.log(allSongs);

          // console.log(songs.data)
        } catch (err) {
          console.log(err);
        }
      }
    counter++
      
    }, 4000);
    console.log(allPlaylists)
  }
);
