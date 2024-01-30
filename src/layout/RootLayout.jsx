import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
function RootLayout() {
  return (
    <div>
       <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default RootLayout