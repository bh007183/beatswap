import * as actions from "../apiActions"
import axios from "axios"
export const api = ({dispatch}) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action)
    next(action)
    const {url, method, headers, data, onSuccess, onError} = action.payload
    try{
        const response =  await axios.request({
            url,
            method,
            headers,
            data,
            onSuccess,
            onError
        })
        dispatch(actions.apiCallSuccess(response.data))
        if(onSuccess)dispatch({type: onSuccess, payload: response.data})

    }catch(error){
        console.log(error)
        dispatch(actions.apiCallFailed(error.response.data))
        if(onError)dispatch({type: onError, payload: error.response.data})

    }

}