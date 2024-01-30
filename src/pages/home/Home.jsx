import  './home.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trendings/Trending'
import Popular from './popular/Popular'
import TopRated from './popular/topRated/TopRated'
function Home() {
  return (
    <div>
      <HeroBanner/>
      <Trending/>
      <Popular/>
     <TopRated/>
    </div>
  )
}

export default Home