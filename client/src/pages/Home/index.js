import React, { useEffect } from 'react'
import { useState, setState} from 'react'
// import DZ from "dzcdn"

import axios from 'axios'


export default function Home() {

   const [html, setHtml] = useState({__html:""})

   //Deezer API Route To Initialize Deezer API Login
    async function CallDeezer(){
      let {data} = await axios.get("http://localhost:3000/deezer/api")
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
