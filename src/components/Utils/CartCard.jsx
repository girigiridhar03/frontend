import {
  deleteCart,
  getCartDetails,
  updateCart,
} from "@/Store/productSlice/service/products.service";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounceFun } from "./customFunctions";

const CartCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product?.quantity);

  const updatedCart = useCallback(
    debounceFun(async (quantity) => {
      const result = await dispatch(
        updateCart({
          productId: product?.productId,
          quantity,
        })
      );
      if (updateCart.fulfilled.match(result)) {
        dispatch(getCartDetails());
      }
    }, 800),
    [dispatch, product?.productId]
  );

  useEffect(() => {
    if (quantity !== product?.quantity) {
      updatedCart(Number(quantity));
      console.log(quantity);
    }
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleDeleteCartItem = async() => {
    const result = await dispatch(deleteCart(product?.productId));

    if (deleteCart.fulfilled.match(result)) {
      dispatch(getCartDetails());
    }
  };

  return (
    <HStack
      w={"100%"}
      h={["150px", "160px", "200px", "200px", "280px"]}
      padding={["0.4rem", "0.5rem"]}
      borderBottom={"1px solid #D1D5DB"}
      alignItems={"center"}
      gap={["1rem", "1rem", "0.7rem"]}
    >
      <Box w={"20%"} h={"100%"}>
        <Image
          w={"100%"}
          h={"100%"}
          src={product?.productImages?.[0]?.url}
          objectFit={"contain"}
        />
      </Box>
      <VStack w={"80%"} alignItems={"flex-start"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Heading size={["1xl", "1xl", "2xl"]}>{product?.name}</Heading>
          <Text fontWeight={"semibold"} fontSize={["0.9rem", "0.9rem", "1rem"]}>
            ₹{product?.price?.toLocaleString()}
          </Text>
        </HStack>
        <VStack w={"100%"} alignItems={"flex-start"} gap={["0.1rem"]}>
          <Text fontSize={["0.8rem", "0.8rem", "1rem"]}>
            Colour: {product?.color?.toUpperCase()}
          </Text>
          <Text fontSize={["0.8rem", "0.8rem", "1rem"]}>
            Variant: {product?.variant}
          </Text>
        </VStack>
        <HStack justifyContent={"start"} w={"100%"} mt={"auto"}>
          <Box>
            <Input
              type="number"
              size={["xs", "xs", "sm"]}
              w={"100px"}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Box>
          <Button
            size={["xs", "xs", "sm"]}
            colorPalette="red"
            onClick={handleDeleteCartItem}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CartCard;
