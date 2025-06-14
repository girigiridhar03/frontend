import {
  addtocartinCartPage,
  getCartDetails,
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

  const updateCart = useCallback(
    debounceFun(async (quantity) => {
      const result = await dispatch(
        addtocartinCartPage({
          productId: product?.productId,
          quantity,
        })
      );
      if (addtocartinCartPage.fulfilled.match(result)) {
        dispatch(getCartDetails());
      }
    }, 800),
    [dispatch, product?.productId]
  );

  useEffect(() => {
    if (quantity !== product?.quantity) {
        updateCart(quantity);
      console.log(quantity);
    }
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };
  return (
    <HStack
      w={"100%"}
      h={"280px"}
      padding={"0.8rem"}
      borderBottom={"1px solid #D1D5DB"}
      alignItems={"center"}
    >
      <Box w={"20%"} h={"100%"}>
        <Image
          w={"100%"}
          h={"100%"}
          src={product?.productImages?.[0]?.url}
          objectFit={"cover"}
        />
      </Box>
      <VStack w={"80%"} alignItems={"flex-start"}>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Heading>{product?.name}</Heading>
          <Text fontWeight={"semibold"}>
            ₹{product?.price?.toLocaleString()}
          </Text>
        </HStack>
        <VStack>
          <Text>Colour: {product?.color?.toUpperCase()}</Text>
          <Text>Variant: {product?.variant}</Text>
        </VStack>
        <HStack justifyContent={"start"} w={"100%"} mt={"auto"}>
          <Box>
            <Input
              type="number"
              w={"100px"}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Box>
          <Button colorPalette="red">Delete</Button>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default CartCard;
