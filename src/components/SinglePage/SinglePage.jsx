import { getSingleProduct } from "@/Store/productSlice/service/products.service";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  NumberInput,
  RatingGroup,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const tabs = ["Descriptioin", "Comments"];

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const singleProduct = useSelector(
    (state) => state?.productReducer?.singleProduct
  );

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
      <VStack w={"100%"} gap={"2rem"}>
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
              transition={"all ease-in-out"}
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
                  transition={"all ease-in-out"}
                  border={
                    currentImage === index
                      ? "2px solid #EC4899"
                      : "1px solid #D1D5DB"
                  }
                  borderRadius={"10px"}
                  overflow={"hidden"}
                  onMouseEnter={() => setCurrentImage(index)}
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
            <VStack alignItems={"flex-start"} gap={"0.5rem"}>
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
            <VStack alignItems={"flex-start"} gap={"0.5rem"}>
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
        <VStack
          w={"100%"}
          alignItems={"flex-start"}
          paddingTop={"1.8rem"}
          paddingInline={"2rem"}
          border={"1px solid #D1D5DB"}
          borderRadius={"10px"}
          gap={"2rem"}
          paddingBottom={"1rem"}
        >
          <HStack gap={"1rem"}>
            {tabs.map((tab, index) => {
              const mapkey = index;

              return (
                <Button
                  key={mapkey}
                  border={"1px solid #D1D5DB"}
                  borderRadius={"30px"}
                  fontSize={"1.1rem"}
                  paddingBlock={"0.5rem"}
                  paddingInline={"0.9rem"}
                  fontWeight={selectedTab === index ? "bold" : "semibold"}
                  cursor={"pointer"}
                  color={selectedTab === index ? "#EC4899" : "#black"}
                  className={selectedTab === index && "tabShadow"}
                  onClick={() => setSelectedTab(index)}
                  transition={"all linear 0.2s"}
                >
                  {tab}
                </Button>
              );
            })}
          </HStack>

          {selectedTab === 0 && (
            <VStack alignItems={"flex-start"} gap={"0.7rem"}>
              {singleProduct?.description?.split("\n")?.map((text, index) => {
                const mapKey = index;
                return (
                  <Text key={mapKey} fontSize={"1rem"}>
                    {text}
                  </Text>
                );
              })}
            </VStack>
          )}

          {selectedTab === 1 && (
            <VStack w={"100%"} alignItems={"flex-start"} gap={"4rem"}>
              <VStack
                w={"100%"}
                maxH={"600px"}
                overflow={"auto"}
                className="comment-container"
                alignItems={"start"}
                gap={"1.5rem"}
                paddingInline={"2rem"}
              >
                {singleProduct?.comments?.length > 0 ? (
                  singleProduct?.comments?.map((comment) => (
                    <VStack
                      key={comment?._id}
                      alignItems={"flex-start"}
                      w={"100%"}
                    >
                      <HStack w={"100%"} justifyContent={"space-between"}>
                        <HStack w={"100%"} gap={"0.6rem"}>
                          <Box>
                            <Avatar.Root bgColor={"secondary"} size={"sm"}>
                              <Avatar.Fallback name={comment?.name} />
                            </Avatar.Root>
                          </Box>
                          <VStack
                            w={"100%"}
                            alignItems={"flex-start"}
                            gap={"0px"}
                          >
                            <Text fontSize={"0.9rem"} fontWeight={"bold"}>
                              {`${
                                comment?.name?.charAt(0)?.toUpperCase() +
                                comment?.name?.slice(1)?.toLowerCase()
                              }${comment?.isDelete ? ` (You)` : ""}`}
                            </Text>
                            <Text fontSize={"0.8rem"} color={"text"}>
                              {moment(comment?.date).format(
                                "DD-MMM-YYYY hh:mm A"
                              )}
                            </Text>
                          </VStack>
                        </HStack>
                        {comment?.isDelete && (
                          <Box cursor={'pointer'}>
                            <BsThreeDotsVertical />
                          </Box>
                        )}
                      </HStack>
                      <Text
                        fontSize={"1rem"}
                        color={"text"}
                        p={"0.5rem"}
                        fontWeight={"semibold"}
                      >
                        {comment?.comment}
                      </Text>
                    </VStack>
                  ))
                ) : (
                  <Text textAlign={"center"} w={"100%"} fontWeight={"bold"}>
                    No Comments
                  </Text>
                )}
              </VStack>
              <HStack w={"100%"}>
                <Input
                  w={"100%"}
                  border={"1px solid #D1D5DB"}
                  borderRadius={"10px"}
                  placeholder="Enter comment"
                />
                <Button
                  bgColor={"rgb(236, 72, 153,0.3)"}
                  color={"secondary"}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                >
                  Add
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default SinglePage;
