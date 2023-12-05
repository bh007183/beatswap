import { createSlice } from '@reduxjs/toolkit'
import { apiStart } from "./apiActions";

export const slice = createSlice({
  name: 'Deezer',
  initialState: {
    deezerData:[]
  },
  reducers: {
    
    addDeezerData: (Deezer, action) => {
      Deezer.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addDeezerData } = slice.actions

export default slice.reducer