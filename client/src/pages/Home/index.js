import React, { useEffect } from 'react'
import { useState, setState} from 'react'
// import DZ from "dzcdn"

import axios from 'axios'


export default function Home() {

   

   //Deezer API Route To Initialize Deezer API Login
    async function CallDeezer(){
      let {data} = await axios.get("http://localhost:3000/deezer/api")
      console.log(data)
      window.location.href = data
       
    };



    useEffect(() => {
      
      CallDeezer()
    }, [])
    

   
    
  return (
    <div>
     test
    </div>
  )
}
