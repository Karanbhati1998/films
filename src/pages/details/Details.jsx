import  './details.scss'
import {useLocation,useParams} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VedioSection from './vedioSection/VedioSection'
import SimilarMovies from './caurosel/SimilarMovies'
import Recommandation from './caurosel/Recommandation'
function Details() {
 const {pathname}=useLocation()
const {mediaType,id}=useParams()
 const {data,loading}=useFetch(`${pathname}/videos`)
 const {data:credits,loading:creditsLoading}=useFetch(`${pathname}/credits`)
  return (
    <>
    <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
    <Cast data={credits?.cast} loading={creditsLoading}/>
    <VedioSection  data={data} loading={loading}/>
    <SimilarMovies mediaType={mediaType} id={id}/>
    <Recommandation mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details