import {useEffect, useState} from 'react'
import apiFetchMovieData from '../utils/Api'

function useFetch(endPoint) {
    const[data,setData]=useState('')
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(null)
    useEffect(()=>{
        setLoading(true)
        setData(null)
        setError(null)
        apiFetchMovieData(endPoint).then(res=>{
            setData(res)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            setError(err)
        })
    },[endPoint])
  return {data,error,loading}
}

export default useFetch