import MainLayoutNavbar from '@/components/Navbars/MainLayoutNavbar'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Box>
        <MainLayoutNavbar />
        <Outlet />
    </Box>
  )
}

export default MainLayout
