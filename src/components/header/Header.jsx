import  './header.scss'
import logo from '../../assets/movix-logo.svg'
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from '../conntentWrapper/ContentWrapper'
import { useEffect, useState ,useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
function Header() {
  const inputRef = useRef(null);
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const[mobileMenu,setMobileMenu]=useState(false)
  const[showSearch,setShowsearch]=useState(false)
  const[query,setQuery]=useState(false)
  const[searchInput,setSearchInput]=useState(false)
  const location=useLocation()
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])
  function controlNavBar(){
    if(lastScrollY>200 ){
      if(window.scrollY>lastScrollY){
        setShow("hide")
      }else{
        setShow("show")
      }
    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  const navigate= useNavigate()
  useEffect(()=>{
    window.addEventListener("scroll",controlNavBar)
    return ()=>{
      window.removeEventListener("scroll",controlNavBar)
    }
  },[lastScrollY])
  function openSearch(){
    setMobileMenu(false)
    setShowsearch(true)
  }
  useEffect(()=>{
    showSearch?inputRef.current.focus():''
  },[showSearch])
  function openMobileMenu(){
    setMobileMenu(true)
    setShowsearch(false)
  }
  function handleSearchInput(e){
    if(e.key=="Enter" && query.trim().length>3){
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowsearch(false)   
      }, 1000);
    }
  }
  function navigateHandler(type){
    if(type=="movie"){
      navigate('/explore/movie')
    }else if(type=='tv'){
      navigate('/explore/tv')
    }else{
      navigate('/')
    }
    setMobileMenu(false)   

  }
  return (
    <header className={`header ${mobileMenu? 'mobileView':""} ${show}`}>
      <ContentWrapper className='contentWrapper'>
      <div className="logo" onClick={navigateHandler}>
     <img src={logo} alt=""  />    
      </div>
    <ul className="menuItems">
      <li className="menuItem" onClick={()=>navigateHandler("movie")}>Movies</li>
      <li className="menuItem" onClick={()=>navigateHandler("tv")}>TV Shows</li>
      <li className="menuItem">
        <HiOutlineSearch onClick={openSearch}/>
      </li>
    </ul>
    <div className="mobileMenuItems">
        <HiOutlineSearch onClick={openSearch}/>
        {mobileMenu ?(
          <VscChromeClose onClick={()=>{
            setMobileMenu(false)
          }}/>
        ):(
          <SlMenu onClick={openMobileMenu}/>
        )
      }
    </div>
      </ContentWrapper>
     {showSearch && <div className='searchBar'>
        <ContentWrapper>
          <div className="searchInput">
            <input type="text" name="" id=""
            ref={inputRef}
            placeholder='Search a Movie Or TV Show'
            onChange={(e)=>{
              setQuery(e.target.value)
            }}
            onKeyUp={handleSearchInput}
            />
             <VscChromeClose onClick={()=>{
            setShowsearch(false)
          }}/>
          </div>
        </ContentWrapper>
      </div>}
    </header>


      
  )
}

export default Header
