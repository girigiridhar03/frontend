import { getSingleProduct } from "@/Store/productSlice/service/products.service";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  NumberInput,
  RatingGroup,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const singleProduct = useSelector(
    (state) => state?.productReducer?.singleProduct
  );
  console.log(singleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

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
      <VStack w={"100%"}>
        {/* top container */}
        <HStack w={"100%"} alignItems={"flex-start"} gap={"1.5rem"}>
        
        {/* Left VStack */}
          <VStack w={"50%"} p={"1rem"} alignItems={"flex-start"}>
            <Box
              w={"100%"}
              border={"1px solid #D1D5DB"}
              height={"500px"}
              overflow={"hidden"}
              borderRadius={"10px"}
            >
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src={singleProduct?.productImages?.[currentImage]?.url}
                alt={`Image-${currentImage}`}
              />
            </Box>
            <HStack>
              {singleProduct?.productImages?.map((item, index) => (
                <Box
                  key={item?._id}
                  w={"160px"}
                  h={"150px"}
                  border={"1px solid #D1D5DB"}
                  borderRadius={"10px"}
                  overflow={"hidden"}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    objectFit={"contain"}
                    src={item?.url}
                    alt={`Image-${currentImage}`}
                  />
                </Box>
              ))}
            </HStack>
          </VStack>

          {/* Right VStack */}
          <VStack
            w={"60%"}
            alignItems="flex-start"
            p={"1rem"}
            height={"100%"}
            gap={"1rem"}
          >
            {/* Heading */}
            <Heading size={"3xl"}>{singleProduct?.name}</Heading>

            {/* Rating */}
            <Box>
              <RatingGroup.Root
                count={5}
                defaultValue={singleProduct?.rating}
                colorPalette="yellow"
                bgColor={"white"}
                size={"sm"}
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </Box>

            {/* Details */}
            <VStack alignItems={'flex-start'} gap={'0.5rem'}>
              <Box>
                Stock:{" "}
                <Span color={"secondary"}>
                  {singleProduct?.stock} items left
                </Span>
              </Box>
              <Box>Colour: {singleProduct?.color?.toUpperCase()}</Box>
              <Box>Variant: {singleProduct?.variant}GB</Box>
            </VStack>

            {/* Price */}
            <Box color={"secondary"} fontSize={"2rem"} fontWeight={"bold"}>
              ₹{singleProduct?.price?.toLocaleString("en-IN")}
            </Box>

            {/* Descriptioin */}
            <VStack alignItems={'flex-start'} gap={"0.5rem"}>
              {singleProduct?.description?.split("\n")?.map((text, index) => {
                const mapKey = index;
                return (
                  <Text key={mapKey} fontSize={"0.9rem"}>
                    {text}
                  </Text>
                );
              })}
            </VStack>

            {/* button and input controller */}
            <HStack gap={"1rem"}>
              <NumberInput.Root defaultValue="1" width="100px">
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>

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
        </HStack>

        {/* Details container and comments */}
        
      </VStack>
    </Box>
  );
};

export default SinglePage;
