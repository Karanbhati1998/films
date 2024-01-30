import {useState} from 'react'
import Caurosel from '../../../components/caurosel/Caurosel'
import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'

function Recommandation({mediaType,id}) {
    const{data,loading}=   useFetch(`/${mediaType}/${id}/recommendations`)
    
    return (
      <div className="caurosel">
        {
          data?.results?.length > 0 &&
        (  <>
   <ContentWrapper>
      <span className="cauroselTitle">
        Recommendations
      </span>
      </ContentWrapper>
<Caurosel data={data} loading={loading} endpoint={mediaType}/>
          </>)
  
}
  </div>
    )
}

export default Recommandation