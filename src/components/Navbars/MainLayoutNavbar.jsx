import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { RxPerson } from "react-icons/rx";
import { SlHandbag } from "react-icons/sl";
import { Link } from "react-router-dom";

const MainLayoutNavbar = () => {
  return (
    <Box
      bg="primary"
      w={"100%"}
      className="customboxShadow"
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={99}
    >
      <HStack
        maxW={"1500px"}
        mx={"auto"}
        w={"99%"}
        color="surface"
        justifyContent={"space-between"}
        p={"1rem"}
      >
        <Box>
          <Heading size={"4xl"}>TrendVolt</Heading>
        </Box>
        <HStack gap={"7rem"} flex={1} justifyContent={"center"}>
          <Link to={"/"}>
            <Text
              cursor="pointer"
              _hover={{ fontWeight: "semibold" }}
              transition="font-weight 0.3s"
            >
              Home
            </Text>
          </Link>
          <Link to={"/electronics"}>
            <Text
              cursor="pointer"
              _hover={{ fontWeight: "semibold" }}
              transition="font-weight 0.3s"
            >
              Electronics
            </Text>
          </Link>
          <Text
            cursor="pointer"
            _hover={{ fontWeight: "semibold" }}
            transition="font-weight 0.3s"
          >
            Fashion
          </Text>
          <Text
            cursor="pointer"
            _hover={{ fontWeight: "semibold" }}
            transition="font-weight 0.3s"
          >
            About
          </Text>
        </HStack>
        <HStack gap={"2rem"}>
          <VStack gap={"1px"} alignItems={"center"}>
            <Box fontSize={"1.2rem"}>
              <RxPerson />
            </Box>
            <Text
              cursor="pointer"
              _hover={{ fontWeight: "semibold" }}
              transition="font-weight 0.3s"
            >
              Profile
            </Text>
          </VStack>

          <Link to={"/cart"}>
            <VStack gap={"1px"}>
              <Box fontSize={"1.2rem"}>
                <SlHandbag />
              </Box>
              <Text
                cursor="pointer"
                _hover={{ fontWeight: "semibold" }}
                transition="font-weight 0.3s"
              >
                Bag
              </Text>
            </VStack>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
};

export default MainLayoutNavbar;
