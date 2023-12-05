import React, { useEffect } from 'react'
import axios from 'axios'
export default function Deezer() {


    async function DeezerReroute(){
    //   let data = await axios.get("http://localhost:3000/api/deezer")
     
    //   console.log(data)
     
       
    };
    useEffect(() => {
      DeezerReroute()
    }, [])
    
  return (
    <div>Deezer</div>
  )
}
