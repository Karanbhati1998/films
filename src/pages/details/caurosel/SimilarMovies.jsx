import {useState} from 'react'
import Caurosel from '../../../components/caurosel/Caurosel'
import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
function SimilarMovies({mediaType,id}) {
    const{data,loading}=   useFetch(
        `/${mediaType}/${id}/similar`)
    function onTabChange(item){
  setEndpoint(item=="Tv Shows"?"tv":"movie")
    }
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return ( 
        <div className="caurosel">
            {
          data?.results?.length > 0 &&
        (  <>
    <ContentWrapper>
      <span className="cauroselTitle">
        {title}
      </span>
      </ContentWrapper>
    <Caurosel data={data} loading={loading} endpoint={mediaType}/>
    </>)
}
  </div>
    )
}

export default SimilarMovies