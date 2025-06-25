import AdminLayoutNavbar from "@/components/Navbars/AdminLayoutNavbar";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarHoverd, setIsSidebarHovered] = useState(false);

  const handleMouseEnter = () => {
      setIsSidebarHovered(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarHovered(false);
  };


  return (
    <Box w={"100%"} h={"100vh"} overflow={"hidden"} display={"flex"}>
      <Box
        w={isSidebarHoverd ? "20%" : "5%"}
        overflow={"hidden"}
        h={"100%"}
        p={"1rem"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        boxShadow={'sm'}
      >
        <AdminLayoutNavbar isSidebarHoverd={isSidebarHoverd} />
      </Box>
      <Box overflow={"auto"} w={"100%"} h={"100%"} p={'1rem'}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
