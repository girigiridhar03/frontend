import { addToCart } from "@/Store/productSlice/service/products.service";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  RatingGroup,
  Span,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const CardComponent = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(addToCart({ productId: product?._id, quantity: 1 }));
  };

  return (
    <Flex
      direction="column"
      w="100%"
      h="100%"
      border="1px solid #D1D5DB"
      p="1rem"
      borderRadius="10px"
    >
      {/* Image */}
      <Link to={`/electronics/${product?._id}`} style={{ width: "100%" }}>
        <Box
          w="100%"
          h={["300px", "300px", "300px", "300px", "250px"]}
          borderRadius="20px"
          overflow="hidden"
        >
          <Image
            w="100%"
            h="100%"
            objectFit="contain"
            src={product?.productImages[0]?.url}
            alt={product?.name}
          />
        </Box>
      </Link>

      {/* Content */}
      <Flex direction="column" justify="space-between" flex="1" mt="1rem">
        {/* Top Info */}
        <Box>
          <Box color="#ADADAD" fontWeight="semibold" fontSize="1.1rem">
            {product?.category?.toUpperCase()}
          </Box>
          <Box fontSize="1.5rem" fontWeight="semibold">
            {product?.name}
          </Box>
          <Box bgColor="white" mt="0.5rem">
            <RatingGroup.Root
              count={5}
              defaultValue={product?.rating}
              colorPalette="yellow"
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </Box>
          <Box color="secondary" fontWeight="semibold" mt="0.5rem">
            <Span color="#ADADAD">By</Span> {product?.brand?.toUpperCase()}
          </Box>
        </Box>

        {/* Bottom Price + Button (Always at Bottom) */}
        <HStack justifyContent="space-between" mt="auto" pt="1rem">
          <Box color="secondary" fontSize="1.5rem" fontWeight="bold">
            ₹{product?.price?.toLocaleString("en-IN")}
          </Box>
          <Button
            bgColor={"secondary"}
            color={"muted"}
            fontWeight="bold"
            onClick={handleAddCart}
          >
            <Span>
              <AiOutlineShoppingCart />
            </Span>
            Add to Cart
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CardComponent;
