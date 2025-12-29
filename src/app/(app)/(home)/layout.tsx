import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { SearchFilter } from './search-filter'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types'

interface Props{
  children: React.ReactNode
}
const payload = await getPayload({
  config: configPromise,
})

const data = await payload.find({
  collection: "categories",
  depth: 1, //populate subcate
  pagination: false,
  where: {
    parent: {
      exists: false,
    },
  },
});

const formattedData = data.docs.map((doc)=>({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((doc)=>({
    ...(doc as Category)
  }))
}))
 
// console.log("data: ", data)
// console.log("formatted data: ", formattedData)
const Layout = ({children}:Props) => {
  return (
    <div>
      <div className='flex flex-col min-h-screen'>
        <Navbar></Navbar>
        <SearchFilter data={formattedData}></SearchFilter>
        <div className='flex-1 bg-[#f4f4f0]'>
        {children}
        </div>
        <Footer></Footer>
      </div>

    </div>
    
  )
}

export default Layout