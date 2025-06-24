import AdminLayoutNavbar from "@/components/Navbars/AdminLayoutNavbar";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box border={'2px solid red'} w={'100%'} h={'100vh'} overflow={'hidden'} display={'flex'}>
      <Box border={'2px solid black'} w={'20%'} overflow={'hidden'} h={'100%'} p={'1rem'}>
        <AdminLayoutNavbar />
      </Box>
      <Box border={'2px solid orange'} overflow={'auto'} w={'100%'} h={'100%'}>
      <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
