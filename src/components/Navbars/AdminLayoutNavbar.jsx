import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "@/Store/LoginSlice/service/Auth.service";
import { Link, useLocation, useNavigate } from "react-router-dom";
const navAndIcons = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    link: "/admin/dashboard",
  },
  {
    name: "Orders",
    icon: ImTruck,
    link: "/admin/orders",
  },
  {
    name: "Users",
    icon: FaPeopleGroup,
    link: "/admin/users",
  },
  {
    name: "Add Product",
    icon: FaPlus,
    link: "/admin/addproduct",
  },
  {
    name: "Product Details",
    icon: MdDescription,
    link: "/admin/productdetails",
  },
];

const navSettingsAndLogout = [
  {
    name: "Settings",
    icon: IoSettingsSharp,
  },
  {
    name: "Logout",
    icon: IoLogOut,
  },
];

const AdminLayoutNavbar = ({ isSidebarHoverd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation();
  // Handle Logout

  const handleLogout = async (item) => {
    if (item.name === "Logout") {
      let result = await dispatch(logout());

      if (logout.fulfilled.match(result)) {
        navigate("/admin/login");
      }
    }
  };

  console.log(path);

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
        <Heading size={"3xl"} textAlign={"center"}>
          {isSidebarHoverd ? "TrendVolt" : "TV"}
        </Heading>

        <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"1rem"}>
          {navAndIcons?.map((item, index) => {
            const mapKey = index;
            const condition =
              path.pathname?.split("/")[2] ===
              item?.name?.split(" ")?.join("")?.toLowerCase();
            console.log(
              path.pathname?.split("/")[2] ===
                item?.name?.split(" ")?.join("")?.toLowerCase()
            );
            return (
              <Link to={item?.link}>
                <HStack
                  key={mapKey}
                  w={"100%"}
                  gap={"1rem"}
                  p={"1rem"}
                  color={condition ? "text" : "grey"}
                  cursor="pointer"
                  bgColor={condition ? "secondary" : ""}
                  borderRadius={condition ? "15px" : ""}
                  className="nav"
                  _hover={{
                    bgColor: "secondary",
                    borderRadius: "15px",
                    color: "text",
                  }}
                >
                  <Box fontSize={"1.5rem"} className="nav-icon">
                    <item.icon />
                  </Box>
                  {isSidebarHoverd && (
                    <Text
                      fontSize={"1.2rem"}
                      fontWeight={"semibold"}
                      className="nav-name"
                      display={isSidebarHoverd ? "block" : "none"}
                    >
                      {item.name}
                    </Text>
                  )}
                </HStack>
              </Link>
            );
          })}
        </Box>
      </Box>

      <VStack w={"100%"} gap=".1rem">
        {navSettingsAndLogout?.map((item, index) => {
          const mapKey = index;
          return (
            <HStack
              key={mapKey}
              w={"100%"}
              gap={"1rem"}
              p={"1rem"}
              color={"grey"}
              cursor="pointer"
              className="nav"
              _hover={{
                bgColor: "secondary",
                borderRadius: "15px",
                color: "text",
              }}
              onClick={() => handleLogout(item)}
            >
              <Box fontSize={"1.5rem"} className="nav-icon">
                <item.icon />
              </Box>

              {isSidebarHoverd && (
                <Text fontSize="1.2rem" fontWeight="semibold">
                  {item.name}
                </Text>
              )}
            </HStack>
          );
        })}
      </VStack>
    </Box>
  );
};

export default AdminLayoutNavbar;
