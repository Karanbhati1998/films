import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import  {Home,PageNotFound,Details,Explore,SearchResults} from './pages'
import RootLayout from './layout/RootLayout'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import useFetch from './hooks/useFetch'
import { getApiConfiguration,getGenures } from './store/homeSlice'
import apiFetchMovieData from './utils/api'
function App() {
  const dispatch=useDispatch()
  const {data} =useFetch('/configuration')
  useEffect(() => {
    fetchApiConfig();
    genresCall()
}, []);

const fetchApiConfig = () => {
  apiFetchMovieData("/configuration").then((res) => {
        const url = {
            backdrop: res.images.secure_base_url + "original",
            poster: res.images.secure_base_url + "original",
            profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
    });
};

const genresCall=async()=>{
  const promises=[]
  const endPoints=["tv","movie"]
  const allGenres={}
  endPoints.forEach(endPoint=>{
   promises.push(apiFetchMovieData(`/genre/${endPoint}/list`))
  })
  const data= await Promise.all(promises)
  data.map(({genres})=>(
    genres.map(item=>{
     [ allGenres[item.id]=item.name]
    })
  ))
  dispatch(getGenures(allGenres));
}

const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path='/:mediaType/:id' element={<Details/>}/>
    <Route path='/search/:query' element={<SearchResults/>}/>
    <Route path='/explore/:mediaType' element={<Explore/>}/>
    <Route path='*' element={<PageNotFound/>}/>

  </Route>
))
  return (
   <RouterProvider router={router}/>
  )
}

export default App