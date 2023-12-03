import React, { useEffect } from 'react'
import { useState, setState} from 'react'
// import DZ from "dzcdn"

import axios from 'axios'


export default function Home() {

   const [html, setHtml] = useState({__html:""})

    async function CallDeezer(){
      let HTMLstring = await axios.get("http://localhost:3001/deez")
      console.log(html)
      setHtml({__html: HTMLstring.data})
       
    }

    

    useEffect(() => {
      
      CallDeezer()
   
      
    
      

    }, [])
    

   
    
  return (
    <div dangerouslySetInnerHTML={html}>
     
    </div>
  )
}
