import React, { useEffect } from 'react'
import { useState, setState} from 'react'
// import DZ from "dzcdn"

import axios from 'axios'


export default function Home() {

    let state = {
        appid: "",
        secret:""
    }

    // async function CallDeezer(){
    //   const DZ = window.DZ
    //  let response = await DZ.init({
    //     appId  : '651351',
    //    channelUrl : 'http://localhost:3000/deezer.html'
    //  })
    //  console.log(response)
    //  DZ.login(function(response) {

    //     if (response.authResponse) {
    //       console.log('Welcome!  Fetching your information.... ');
    //       DZ.api('/user/me', function(response) {
    //         console.log('Good to see you, ' + response.name + '.');
    //       });
    //     } else {
    //       console.log('User cancelled login or did not fully authorize.');
    //     }
    //   }, {perms: 'basic_access,email'});
       
    // }

    

    useEffect(() => {
      
      CallDeezer()
   
      // DZ.login(function(response) {
      //   if (response.authResponse) {
      //     console.log('Welcome!  Fetching your information.... ');
      //     DZ.api('/user/me', function(response) {
      //       console.log('Good to see you, ' + response.name + '.');
      //     });
      //   } else {
      //     console.log('User cancelled login or did not fully authorize.');
      //   }
      // }, {perms: 'basic_access,email'});
        
    //   setState(state =>{
    //      state.appid = process.env.REACT_APP_DEEZER_APPID,
    //      state.secret=process.env.REACT_APP_DEEZER_SECRET
    //   })
      console.log(state)
    
      

    }, [])
    

   
    
  return (
    <div></div>
  )
}
