import { useState } from "react"
import ContentWrapper from "../../../components/conntentWrapper/ContentWrapper"
import Caurosel from "../../../components/caurosel/Caurosel"
import SwitchTab from "../../../components/switchTabs/SwitchTab"
import '../home.scss'
import useFetch from "../../../hooks/useFetch"
function Trending() {
  const[endpoint,setEndpoint]=useState('day')
  const{data,loading}=   useFetch(`/trending/all/${endpoint}`)
  function onTabChange(item){
setEndpoint(item)
  }
  return (
    <div className="trending">
      <ContentWrapper>
        <span className="trendingTitle">
          Trending
        </span>
        <SwitchTab data={["day","week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Caurosel data={data} loading={loading}/>
    </div>
  )
}

export default Trending