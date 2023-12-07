import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "./apiActions";

export const slice = createSlice({
  name: 'Deezer',
  initialState: {
    deezerData:[],
    error: ""
  },
  reducers: {
    
    addDeezerData: (Deezer, action) => {
      console.log(action)
      Deezer.deezerData = action.payload
    },

    setDeezerError: (Deezer, action) => {
      Deezer.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addDeezerData, setDeezerError } = slice.actions

export default slice.reducer

export const getUsersData = (id) => apiCallBegan({
    url: "http://localhost:3001/deezer/" + id,
    method: "GET",
    onSuccess: addDeezerData.type,
    onError: setDeezerError.type
  })
