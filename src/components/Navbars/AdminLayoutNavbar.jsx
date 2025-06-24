import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { ImTruck } from "react-icons/im";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
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

const AdminLayoutNavbar = () => {
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
          TrendVolt
        </Heading>

        <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"1rem"}>
          {navAndIcons?.map((item, index) => {
            const mapKey = index;
            return (
              <HStack
                key={mapKey}
                role="group"
                w={"100%"}
                gap={"1rem"}
                p={"1rem"}
                color={"grey"}
                _hover={{ bgColor: "background", borderRadius: "20px" }}
                cursor="pointer"
              >
                <Box fontSize={"1.5rem"}>
                  <item.icon />
                </Box>
                <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
                  {item.name}
                </Text>
              </HStack>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayoutNavbar;
