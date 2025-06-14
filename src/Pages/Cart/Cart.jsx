import CartCard from "@/components/Utils/CartCard";
import { getCartDetails } from "@/Store/productSlice/service/products.service";
import { Box, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector(
    (state) => state?.productReducer?.cartDetails
  );

  const cartArray = cartDetails?.data;
//   console.log(cartDetails);

  useEffect(() => {
    dispatch(getCartDetails());
  }, []);

  return (
    <Box
      maxW={"1500px"}
      mx={"auto"}
      w={"93%"}
      marginTop={{ base: "7rem" }}
      position={"relative"}
      marginBottom={"2rem"}
      paddingBottom={"2rem"}
    >
      <VStack
        bgColor={"surface"}
        borderRadius={"10px"}
        w={"100%"}
        alignItems={"flex-start"}
        p={"1rem"}
        gap={"2rem"}
      >
        <Heading
          size={"3xl"}
          borderBottom={"1px solid #D1D5DB"}
          paddingBottom={"1rem"}
          w={"100%"}
        >
          Shopping Cart
        </Heading>

        <VStack w={"100%"}>
          {cartArray?.map((item) => {
            return (
              <Box key={item?._id} w={'100%'}>
                <CartCard product={item} />
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Cart;
