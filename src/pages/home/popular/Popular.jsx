import { useState } from "react"
import ContentWrapper from "../../../components/conntentWrapper/ContentWrapper"
import Caurosel from "../../../components/caurosel/Caurosel"
import SwitchTab from "../../../components/switchTabs/SwitchTab"
import useFetch from "../../../hooks/useFetch"
function Popular() {
    const[endpoint,setEndpoint]=useState('movie')
    
  const{data,loading}=   useFetch(`/${endpoint}/popular`)
  function onTabChange(item){
setEndpoint(item=="Tv Shows"?"tv":"movie")
  }
  return ( 
      <div className="trending">
  <ContentWrapper>
    <span className="trendingTitle">
      What's Popular
    </span>
    <SwitchTab data={["movies","Tv Shows"]} onTabChange={onTabChange} />
  </ContentWrapper>
  <Caurosel data={data} loading={loading} endpoint={endpoint}/>
</div>
  )
}

export default Popular