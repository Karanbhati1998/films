import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import CauroselData from './cauroselData/CauroselData';
import './cauresl.scss'
import ContentWrapper from '../conntentWrapper/ContentWrapper';
function Caurosel({data,loading,endpoint}) {
 const cauroselContainer=useRef()
 function handleScroll(dir){
  const container=cauroselContainer.current
const totalWidth=container.scrollLeft+(container.offsetWidth + 20)
  const scrollAmount=dir=="left"?container.scrollLeft-(container.offsetWidth + 20):totalWidth>=container.scrollWidth?container.scrollLeft=0:container.scrollLeft+(container.offsetWidth+20)
  container.scrollTo({
    left:scrollAmount,
    behavior:"smooth"
  })
 }
 const skItem = () => {
  return (
    <div className="skeletonItem">
    <div className="posterBlock skeleton "></div>
    <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
    </div>
</div>
  );
};
  return (
    <div className="caurosel">
        <ContentWrapper>
        <BsFillArrowLeftCircleFill
           className="carouselLeftNav arrow"
           onClick={()=>handleScroll("left")}
        />
        <BsFillArrowRightCircleFill
         className="carouselRighttNav arrow"
         onClick={()=>handleScroll("right")}
        />
        {loading ? (
          <div className="loadingSkeleten">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ):(
            <div className="cauroselItems" ref={cauroselContainer}>
     {   
        data?.results?.map(item=>{
                return <CauroselData key={item.id} {...item} endpoint={endpoint}/>
              
            })}
        </div>
        )
        }
        </ContentWrapper>

    </div>
  )
}

export default Caurosel