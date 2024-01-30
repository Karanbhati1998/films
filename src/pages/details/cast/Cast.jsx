import ContentWrapper from '../../../components/conntentWrapper/ContentWrapper'
import LazyLoadImg from '../../../components/lazyloading/LazyLoadImg'
LazyLoadImg
import avator from '../../../assets/avatar.png'
import './cast.scss'
import { useSelector } from 'react-redux'


function Cast({data,loading}) {
  const{url}=  useSelector(state=>state.home)
  const skeleton=()=>{
    return(
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    )
  }
  return (
    <div className="castSection">
        <ContentWrapper>
            <div className="sectionHeading">Top Cast</div>
            {
                loading?(
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ):(
                    <div className="listItems">
                      {  data?.map(item=>{
                        let path=item.profile_path? url?.backdrop+item?.profile_path:avator
                          return(
                            <div className="listItem" key={item.id}>
                            <div className="profileImg">
                                <LazyLoadImg img={path}/>
                            </div>
                            <div className="name">{item.name}</div>
                            <div className="character">{item.character}</div>
                        </div>
                        )
                        })}
                    </div>
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Cast