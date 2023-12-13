import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'
import { Outlet } from 'react-router-dom'
import Bottombar from '../components/Bottombar'
import { ThemeProvider } from '@/context/ThemeProvier'

const RootLayout = () => {
  return (
    <ThemeProvider>
    <div className='w-full md:flex'>
        <Navbar />
        <LeftSidebar />

        <section className='flex flex-1 h-full sm:h-auto'>
            <Outlet />
        </section>
        <Bottombar />

    </div>
    </ThemeProvider>
  )
}

export default RootLayout
