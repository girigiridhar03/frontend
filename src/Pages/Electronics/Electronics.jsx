import ElectronicsSection from "@/components/ElectronicsComponents/ElectronicsSection";
import { Box } from "@chakra-ui/react";
import React from "react";

const Electronics = () => {
  return (
    <Box maxW={"1500px"} mx={"auto"} w={"93%"} marginTop={{base :"7rem"}} position={'relative'} marginBottom={"2rem"} paddingBottom={'2rem'}>
      <ElectronicsSection />
    </Box>
  );
};

export default Electronics;
