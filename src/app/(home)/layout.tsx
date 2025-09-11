import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

interface Props{
  children: React.ReactNode
}
const Layout = ({children}:Props) => {
  return (

    <div>
      <div className='flex flex-col min-h-screen'>
        <Navbar></Navbar>
        <div className='flex-1 bg-[#f4f4f0]'>
        {children}
        </div>
        <Footer></Footer>
      </div>

    </div>
    
  )
}

export default Layout