import {
  Box,
  Button,
  HStack,
  Image,
  RatingGroup,
  Span,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
const CardComponent = ({ product }) => {
  return (
    <HStack w={"100%"} gap={"2rem"}>
      <Box boxShadow={"xs"} w={"30%"} height={"350px"} borderRadius={"10px"} overflow={'hidden'}>
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          src={product?.productImages[0]?.url}
          alt={product?.name}
        />
      </Box>
      <VStack alignItems={"flex-start"} w={"70%"} >
        <Box color={"muted"} fontWeight={"semibold"} fontSize={"1.1rem"}>
          {product?.brand?.toUpperCase()}
        </Box>
        <Box fontSize={"1.5rem"} fontWeight={"semibold"}>
          {product?.name}
        </Box>
        <Box bgColor={"white"}>
          <RatingGroup.Root
            count={5}
            defaultValue={product?.rating}
            colorPalette="yellow"
            bgColor={"white"}
          >
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </Box>
        <Box>
          {product?.description?.length >= 500
            ? `${product?.description?.slice(0, 500)}...`
            : product?.description}
        </Box>
        <Box color={"secondary"} fontSize={"2rem"} fontWeight={"bold"}>
          {product?.price?.toLocaleString("en-IN")}
        </Box>
        <Button bgColor={"secondary"} color={"white"} fontWeight={"bold"}>
          <Span>
            <AiOutlineShoppingCart />
          </Span>
          Add to Cart
        </Button>
      </VStack>
    </HStack>
  );
};

export default CardComponent;
