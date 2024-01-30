import  './searchResult.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
import ContentWrapper from '../../components/conntentWrapper/ContentWrapper'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiFetchMovieData from '../../utils/api'
import CauroselData from '../../components/caurosel/cauroselData/CauroselData'
function SearchResults() {
  const[data,setData]=useState('')
  const[pageNo,setPageNo]=useState(1)
  const[loading,setLoading]=useState(false)
  const {query}=useParams()
  const fetchInitalData=async()=>{
    setLoading(true)
    const res=await apiFetchMovieData(`/search/multi?query=${query}&page=${pageNo}`)
    setData(res)  
    setPageNo(prev=>prev+1)
    setLoading(false)
  }
  const fetchNextPageData=async()=>{
    setLoading(true)
    const res=await apiFetchMovieData(`/search/multi?query=${query}&page=${pageNo}`)
    if(data?.results){
      setData(prev=>{
        return {...prev,results:[...prev?.results,...res?.results]}
      })  
    }else{
      setData(res)
    }
    setPageNo(prev=>prev+1)
  }
  useEffect(()=>{
    setData(null)
    setPageNo(1)
  fetchInitalData()
  },[query])
  return (
    <div className="searchResultPage">
      {false ?<Spinner initial={true}/>:(
        <ContentWrapper>
          
          {
            data?.results?.length>0?(
              <>
              <div className="pageTitle">
                {
                  `Search ${data?.total_results>1?"results":"result"} of '${query}'`
                }
              </div>
              <InfiniteScroll
              dataLength={data?.results?.length||[]}
              className='content'
              next={fetchNextPageData}
              hasMore={pageNo<=data?.total_pages}
              loader={<Spinner/>}
              >
                {
                  data?.results?.map((item,index)=>{
                    return (
                      <MovieCard key={item.id} {...item} />
                    )
                  })
                }
              </InfiniteScroll>
              </>

            ):(
              <div className="resultNotfound">
              Sorry,Results Not Found
              </div>
            )
          }



        </ContentWrapper>
      )
    }
    </div>
  )
}

export default SearchResults