import React from 'react'
import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'
import { Outlet } from 'react-router-dom'
import Bottombar from '../components/Bottombar'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
        <Navbar />
        <LeftSidebar />

        <section className='flex flex-1 h-full'>
            <Outlet />
        </section>

        <Bottombar />
    </div>
  )
}

export default RootLayout
