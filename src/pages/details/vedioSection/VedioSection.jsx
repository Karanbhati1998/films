import './vedioSection.scss'
import VedioPopup from '../../../components/vedioPopup/VedioPopup'
import LazyLoadImg from '../../../components/lazyloading/LazyLoadImg'
import Playbtn from '../Playbtn/Playbtn'
import { useState } from 'react'
import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
function VedioSection({data,loading}) {
    const[show,setShow]=useState(false)
    const[videoId,setVideoId]=useState(null)
    const loadingSkeleton=()=>{
        return(
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    }
  return (
    <div className="vedioSection">
        {
            data?.results?.length>0 &&
           <> 
           <ContentWrapper>
               <div className="sectionHeading">Offical Heading</div>
               {  
                   loading?(
                       <div className="videoSkeleton">
                           {loadingSkeleton()}
                           {loadingSkeleton()}
                           {loadingSkeleton()}
                           {loadingSkeleton()}
                           {loadingSkeleton()}
                       </div>
                   ):(
                       <div className="vedios">
                           {
                               data?.results?.map(item=>(
                                   <div className="vedio" key={item.id}>
                                       <div className="thumbnail" onClick={()=>{
                                           setShow(true)
                                           setVideoId(item.key)
                                       }}>
                                       <LazyLoadImg img={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                                       />
                                       <Playbtn/>
                                       </div>
                                       <div className="videoTitle">{item.name}</div>
                                   </div>
                               ))
                           }
                       </div>
                   )
               }
           </ContentWrapper>
           <VedioPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}/>
           </> 
        }
    </div>
  )
}

export default VedioSection