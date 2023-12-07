import {combineReducers} from 'redux'
import deezerReducer from "./deezerActions"
import spotifyActions from './spotifyActions'


export default combineReducers({
    Deezer: deezerReducer,
    Spotify: spotifyActions,
   

})