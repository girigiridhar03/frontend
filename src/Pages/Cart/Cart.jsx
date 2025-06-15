import CartCard from "@/components/Utils/CartCard";
import { getCartDetails } from "@/Store/productSlice/service/products.service";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector(
    (state) => state?.productReducer?.cartDetails
  );

  const cartArray = cartDetails?.data;

  useEffect(() => {
    dispatch(getCartDetails());
  }, []);

  const conditionBasedText = cartArray?.length === 1 ? "item" : "items";

  return (
    <HStack
      maxW={"1500px"}
      mx={"auto"}
      w={"93%"}
      marginTop={{ base: "7rem" }}
      position={"relative"}
      marginBottom={"2rem"}
      paddingBottom={"2rem"}
      gap={"1rem"}
      alignItems={"flex-start"}
      flexDirection={["column-reverse", "column-reverse", "row"]}
    >
      <VStack
        bgColor={"surface"}
        borderRadius={"10px"}
        w={["100%", "100%", "100%", cartArray?.length > 0 ? "70%" : "100%"]}
        alignItems={"flex-start"}
        p={"1rem"}
        gap={"2rem"}
      >
        <Heading
          size={["1xl", "1xl", "2xl"]}
          borderBottom={"1px solid #D1D5DB"}
          paddingBottom={"1rem"}
          w={"100%"}
        >
          Shopping Cart
        </Heading>

        {cartArray?.length > 0 ? (
          <VStack w={"100%"} alignItems={"flex-start"}>
            {cartArray?.map((item) => {
              return (
                <Box key={item?._id} w={"100%"}>
                  <CartCard product={item} />
                </Box>
              );
            })}
          </VStack>
        ) : (
          <VStack w={"100%"}>
            <Text fontSize={"1.5rem"}>Your Cart is Empty.</Text>
          </VStack>
        )}
      </VStack>

      {cartArray?.length > 0 && (
        <VStack
          bgColor={"surface"}
          borderRadius={"10px"}
          w={["100%", "100%", "100%", "30%"]}
          alignItems={"flex-start"}
          p={"1rem"}
          gap={"2rem"}
        >
          <Heading>
            Subtotal ({cartArray?.length} {conditionBasedText}): ₹
            {cartDetails?.cartTotal?.toLocaleString()}
          </Heading>
          <Button
            w={"100%"}
            bgColor={"secondary"}
            color={"white"}
            borderRadius={"10px"}
          >
            Proceed to buy
          </Button>
        </VStack>
      )}
    </HStack>
  );
};

export default Cart;
