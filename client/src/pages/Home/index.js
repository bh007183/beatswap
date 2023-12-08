import React, { useEffect } from 'react'
import { useState, setState} from 'react'
// import DZ from "dzcdn"
import { useDispatch, useSelector } from 'react-redux'
import { initDeezerLogin } from '../../store/deezerActions'

import axios from 'axios'
import { initSpotifyLogin } from '../Spotify/tools'



export default function Home() {

  const dispatch = useDispatch()

    useEffect(() => {

      initSpotifyLogin()
    
    }, [])
    

   
    
  return (
    <div>
     test
    </div>
  )
}
