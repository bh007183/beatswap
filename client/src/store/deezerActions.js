import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "./apiActions";

export const slice = createSlice({
  name: 'Deezer',
  initialState: {
    deezerData:[],
    error: "",
    success:""
  },
  reducers: {
    
    addDeezerData: (Deezer, action) => {
      console.log(action)
      Deezer.deezerData = action.payload
    },

    setDeezerError: (Deezer, action) => {
      Deezer.error = action.payload
    },

    setDeezerSuccess: (Deezer, action) => {
      Deezer.success = action.payload
    },
    
    initDeezerLogin: () =>{
      window.location.href = "https://connect.deezer.com/oauth/auth.php?app_id=651351&redirect_uri=http://localhost:3000/deezer&perms=basic_access,email,manage_library,delete_library"
    }

  },
})

// Action creators are generated for each case reducer function
export const { addDeezerData, setDeezerError,setDeezerSuccess, initDeezerLogin } = slice.actions

export default slice.reducer

export const getUsersData = (id) => apiCallBegan({
    url: "http://localhost:3001/deezer/" + id,
    method: "GET",
    onSuccess: addDeezerData.type,
    onError: setDeezerError.type
  })

 

