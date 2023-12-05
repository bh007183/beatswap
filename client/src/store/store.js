import {combineReducers} from 'redux'
import deezerReducer from "./deezerActions"


export default combineReducers({
    Deezer: deezerReducer,
   

})