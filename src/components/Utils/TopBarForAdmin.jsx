import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const TopBarForAdmin = () => {
  return (
    <Box
      w={"100%"}
      p={"1rem"}
      px={'1.7rem'}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Heading size={"3xl"}>Orders</Heading>
      <HStack>
        <Avatar.Root size={'lg'}>
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src="/" />
        </Avatar.Root>
        <VStack alignItems={'flex-start'} gap={'0'}>
           <Text fontSize={'0.9rem'} fontWeight={'semibold'}>Segun Adebayo</Text>
           <Text fontSize={'0.8rem'} fontWeight={'semibold'}>Admin</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TopBarForAdmin;
