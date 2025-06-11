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
import { Link } from "react-router-dom";
const CardComponent = ({ product }) => {
  return (
    <VStack
      w={"100%"}
      gap={"2rem"}
      border={"1px solid #D1D5DB"}
      p={"1rem"}
      borderRadius={"10px"}
    >
      <Link to={`/electronics/${product?._id}`} style={{ width: "100%" }}>
        <Box
          w={"100%"}
          height={["300px", "300px", "300px", "300px", "250px"]}
          borderRadius={"10px"}
          overflow={"hidden"}
        >
          <Image
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
            src={product?.productImages[0]?.url}
            alt={product?.name}
          />
        </Box>
      </Link>
      <VStack alignItems={"flex-start"} w={"100%"}>
        <Box color={"#ADADAD"} fontWeight={"semibold"} fontSize={"1.1rem"}>
          {product?.category?.toUpperCase()}
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
        <Box color={"secondary"} fontWeight={"semibold"}>
          <Span color={"#ADADAD"}>By</Span> {product?.brand?.toUpperCase()}
        </Box>

        <HStack w={"100%"} justifyContent={"space-between"}>
          <Box color={"secondary"} fontSize={"1.5rem"} fontWeight={"bold"}>
            ₹{product?.price?.toLocaleString("en-IN")}
          </Box>
          <Button
            bgColor={"rgb(236, 72, 153,0.3)"}
            color={"secondary"}
            fontWeight={"bold"}
          >
            <Span>
              <AiOutlineShoppingCart />
            </Span>
            Add to Cart
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default CardComponent;
