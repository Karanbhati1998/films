import axios from 'axios'

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_token=import.meta.env.VITE_TMDB_TOKEN
 const headers={
    Authorization:"bearer " + TMDB_token
}
export default async function apiFetchMovieData(endPoint,params){
    try {
        const {data}= await  axios.get(BASE_URL+endPoint,{
            headers:headers,
            params:params
        })
        return data
    } catch (error) {
        return error.message
    }
}