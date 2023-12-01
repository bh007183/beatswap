import axios from 'axios'

axios.get("https://api.deezer.com/user/2529").then(({data, err}) =>{
    console.log(data)
})