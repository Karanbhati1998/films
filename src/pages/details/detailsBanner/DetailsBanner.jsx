import useFetch from "../../../hooks/useFetch"
import {useLocation} from 'react-router-dom'
import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
import LazyLoadImg from '../../../components/lazyloading/LazyLoadImg'
import  {useSelector} from 'react-redux'
import posterFallBAck from '../../../assets/no-poster.png'
import dayjs from 'dayjs'
import Genres from '../../../components/genres/Genres'
import RatingCircle from '../../../components/RatingCircle/RatingCircle'
import Playbtn from '../Playbtn/Playbtn'
import VedioPopup from "../../../components/vedioPopup/VedioPopup"
import './detailBanner.scss'
import { useState } from "react"
function DetailsBanner({crew,video}) {
    const [show,setShow]=useState(false)
    const [videoId,setVideoId]=useState(null)
    const {pathname} =useLocation()
    const {data,loading}=useFetch(pathname)
    const{url}=useSelector(state=>{
        return state.home
    })
    const _genre=data?.genres?.map(g=>g.id);
    function toHoursAndMinutes(time){
        const hours=Math.floor(time/60)
        const min=time%60
        return `${hours}h  ${min>0?`${min}m`:''}`

    }
    const director=crew?.filter(d=>d.job=="Director")
    const writer=crew?.filter(d=>d.job=="Writer"||d.job=="Screenplay"||d.job=="Story")
  
  return (
    <div className="detailsBanner">
        {
            !loading ?(
                <>
                {
                    data && (
                        <>
                        <div className="backdrop-img">
                            <LazyLoadImg img={url.backdrop+data.backdrop_path}/>
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                <LazyLoadImg
                                className="posterImg"
                                 img={url.backdrop+data.poster_path || posterFallBAck}/>
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {`${data?.title || data?.name} (${dayjs(data.release_date).format('YYYY')}) `}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres genre_ids={_genre} />
                                        <div className="row">
                                        <RatingCircle vote_average={data?.vote_average?.toFixed(1)}/>
                                        <div className="playbtn" onClick={()=>{
                                            setVideoId(video?.key)
                                            setShow(true)}}>
                                            <Playbtn/>
                                            <span className="text">
                                                Watch Trailer
                                            </span>
                                        </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="descreption">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {
                                                data.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Status:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.status}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Status:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.release_date}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            {
                                                data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Runtime:{" "}
                                                        </span>
                                                        <span className="text">
                                                            {toHoursAndMinutes(data.runtime)}
                                                            
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                      {
                                        director?.length>0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {
                                                        director.map((d,i)=>(
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length-1!=i&&", "}
                                                            </span>
                                                        ))
                                                    }
                                                </span>
                                            </div>
                                        )
                                      }
                                      {
                                        writer?.length>0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {
                                                        writer.map((d,i)=>(
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length-1!=i&&", "}
                                                            </span>
                                                        ))
                                                    }
                                                </span>
                                            </div>
                                        )
                                      }
                                      {
                                        data.created_by?.length>0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {
                                                        data.created_by?.map((d,i)=>(
                                                            <span key={i}>
                                                                {d.name}
                                                                {data.created_by?.length-1!=i&&", "}
                                                            </span>
                                                        ))
                                                    }
                                                </span>
                                            </div>
                                        )
                                      }
                                </div>
                            </div>
                            <VedioPopup
                            show={show}
                            setShow={setShow}
                            videoId={videoId}
                            setVideoId={setVideoId}
                            />
                        </ContentWrapper>
                        </>
                    )
                }
                </>
            ):(
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                    
                </div>
            )
        }
    </div>
  )
}

export default DetailsBanner