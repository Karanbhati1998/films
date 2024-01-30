import './genres.scss'
import {useSelector} from 'react-redux'
function Genres({genre_ids}) {
   const {genres}= useSelector(state=>{
        return state.home
    })
  return (
   <div className="genres">
    {
       genre_ids?.map(g=>{
        return <div className="genre" key={g}>
          {genres[g]}
        </div>
       })
    }
   </div>
  )
}

export default Genres