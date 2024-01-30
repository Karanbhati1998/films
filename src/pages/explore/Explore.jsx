import  './explore.scss'
import ContentWrapper from '../../components/conntentWrapper/ContentWrapper'
import MovieCard from '../../components/movieCard/MovieCard'
import { useParams } from "react-router-dom";
import Spinner from '../../components/spinner/Spinner'
import apiFetchMovieData from '../../utils/api';
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Select from "react-select";


let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const selectLanguage=[  { value: "hindi", label: "Hindi Movie" },
{ value: "english", label: "English Movie" },
]
function Explore() {
const[data,setData]=useState('')
const[loading,setLoading]=useState(false)
const[pageNo,setPageNo]=useState(1)
const[genre,setGenre]=useState(null)
const[sortBy,setSortBy]=useState(null)
const {mediaType} = useParams()
const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchIntialData=async()=>{
        setLoading(true)
        const res=await apiFetchMovieData(`/discover/${mediaType}`,filters)
        setData(res)
        setPageNo(prev=>prev+1)
        setLoading(false)
  }
  const fetchNextPageData=async()=>{
        const res=await apiFetchMovieData(`/discover/${mediaType}?page=${pageNo}`,filters)
        if(data?.results){
          setData(
           { ...data,results:[...data?.results,...res?.results]}
          )
        }else{
          setData(res)
        }
        setPageNo(prev=>prev+1)
  }
  useEffect(()=>{
    setData(null)
    setPageNo(1)
    setSortBy(null);
    setGenre(null);
    fetchIntialData()
  },[mediaType])
function onChange(selectedItems,action){
  if (action.name=='sortby') {
    setSortBy(selectedItems)
    if(action.action!=="clear"){
      filters.sort_by=selectedItems.value;
    }
    else{
      delete filters.sort_by
    }
  }
if (action.name=='genres') {
  setGenre(selectedItems)
  if (action.action!=="clear") {
    let  genreId=selectedItems.map(g=>g.id)
    genreId=JSON.stringify(genreId.slice(1,-1))
    filters.with_genres=genreId
  }else{
    delete filters.with_genres
  }
}

setPageNo(1);
fetchIntialData();
}
  return (
   <div className="explorePage">
    <ContentWrapper>
      <div className="pageHeader">
        <div className="pageTitle">
          {mediaType=="tv"?"Explore TV Shows":"Explore Movies"}
        </div>
        <div className="filters">
          <Select
             isMulti
          name="genres"
          value={genre}
          options={genresData?.genres}
          closeMenuOnSelect={false}
          getOptionLabel={options=>options.name}
          getOptionValue={options=>options.id}
          onChange={onChange}
          placeholder="Select Genres"
          className="react-select-container genresDD"
          classNamePrefix="react-select"
          />
          <Select
          name="sortby"
          value={sortBy}
          options={sortbyData}
          onChange={onChange}
          placeholder="Sort By"
          className="react-select-container sortbyDD"
          classNamePrefix="react-select"
          />
         
        </div>
      </div>
      {
        loading?(
          <Spinner initial={true} />
        ):(
          <>{
          data?.results?.length>0?(
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length ||[]} //This is important field to render the next data
            next={fetchNextPageData}
            hasMore={pageNo <= data?.total_pages}
            loader={<Spinner/>}
            >
              {
                data?.results?.map(item=>{
                  return(
                    <MovieCard key={item.id} {...item} media_type={mediaType}/>
                  )
                })
              }
            </InfiniteScroll>
          ):(
            <div className="resultNotFound">
            Sorry,Results Not Found
            </div>
          )
          }
          </>
        )
      }
    </ContentWrapper>
   </div>
  )
}

export default Explore