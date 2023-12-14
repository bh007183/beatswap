import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersData, addDeezerData, setDeezerError , postDeezer} from '../../store/deezerActions'
export default function Deezer() {

  const dispatch = useDispatch()

  const Error = useSelector((state) => state.Store.Deezer.error)
  const spotifyData = useSelector((state) => state.Store.Spotify.Playlists)
  const accessToken = useSelector((state) => state.Store.Spotify.accessToken)
    // async function DeezerReroute(){
    //   let id = window.location.href.split("=")[1]
    //   let data = await axios.get("http://localhost:3001/deezer/" + id)

     
    //   console.log(data)
     
       
    // };
    useEffect(() => {
      let id = window.location.href.split("=")[1]
      dispatch(getUsersData(id))
    }, [])

    useEffect(() => {
      // dispatch(postDeezer(spotifyData, accessToken))

    },[])
    
  return (
    <div>Deezer</div>
  )
}
