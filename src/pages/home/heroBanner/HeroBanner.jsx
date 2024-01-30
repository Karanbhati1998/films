import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import  './heroBanner.scss'
import LazyLoadImg from '../../../components/lazyloading/LazyLoadImg'
import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
function HeroBanner() {
  const[background,setBackground]=useState('')
  const [searchInput,setSearchInput]=useState('')
  
  const { url } = useSelector((state) => state.home);
  const navigate=useNavigate()
  function searchInputHandle(e){
    if(e.key=="Enter" && searchInput.trim().length>=3 ){
      navigate(`/search/${searchInput}`)
    }
  }
  const{data,loading}=useFetch('/movie/upcoming')
  useEffect(()=>{
    const bg=(url?.backdrop || "https://image.tmdb.org/t/p/original")+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
    setBackground(bg)
  },[data])
  return (
    <div className="heroBanner">
     {!loading && url?.backdrop && <div className="backdrop">
        <LazyLoadImg img={background}/>
        </div>}
        <div className="opacity-layer">

        </div>
        <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome..</span>
          <span className="subTitle">
Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input type="text" value={searchInput} 
            placeholder='Search for a movie or Tv Shows'
            onKeyUp={searchInputHandle}
            onChange={(e)=>{
              setSearchInput(e.target.value)
            }}
            />
            <button>Search</button>
          </div>
        </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner