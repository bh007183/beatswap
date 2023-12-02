import React, { useEffect } from 'react'
import { useState, setState} from 'react'

import axios from 'axios'


export default function Home() {

    let state = {
        appid: "",
        secret:""
    }

    async function CallDeezer(){
        let appid = useState(state.appid)
        let secret = useState(state.secret)
       
    }

    useEffect(() => {
        
    //   setState(state =>{
    //      state.appid = process.env.REACT_APP_DEEZER_APPID,
    //      state.secret=process.env.REACT_APP_DEEZER_SECRET
    //   })
      console.log(state)
      

    }, [state])
    

   
    
  return (
    <div></div>
  )
}
