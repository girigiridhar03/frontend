import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
const navAndIcons = [
  {
    name: "Dashboard",
    icon: MdDashboard,
  },
  {
    name: "Orders",
    icon: ImTruck,
  },
  {
    name: "Users",
    icon: FaPeopleGroup,
  },
  {
    name: "Add Product",
    icon: FaPlus,
  },
  {
    name: "Product Details",
    icon: MdDescription,
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
