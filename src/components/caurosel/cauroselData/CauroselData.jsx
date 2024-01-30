import './cauroselData.scss'
import { useSelector } from "react-redux";
import LazyLoadImg from '../../lazyloading/LazyLoadImg';
import dayjs from 'dayjs'
import Genres from '../../genres/Genres';
import RatingCircle from '../../RatingCircle/RatingCircle';
import {useNavigate} from 'react-router-dom'
import PosterFallBack from '../../../assets/no-poster.png'
function CauroselData({poster_path,title,name,release_date,first_air_date,genre_ids,id,vote_average,media_type,endpoint}) {
  const navigate=useNavigate()
  const {url}=useSelector(state=>{
    return state.home
})
const posterUrl = poster_path
? url.poster + poster_path
: PosterFallBack;
  return (
    <div className="movieCard">
      <div className="posterBlock"  onClick={()=>{
      navigate(`/${media_type||endpoint}/${id}`)
    }}>
      <LazyLoadImg img={posterUrl}/>
      {
        vote_average &&
      <RatingCircle vote_average={vote_average?.toFixed(1)} />
      }
      <Genres genre_ids={genre_ids?.slice(0,2)}/>
      </div>
      <div className="textBlock">
      <div className="trendingTitle">{title||name}</div>
      <div className="date">
        {
          dayjs(release_date||first_air_date).format("MMM D,YYYY")
        }</div>
      </div>
    </div>
  )
}

export default CauroselData