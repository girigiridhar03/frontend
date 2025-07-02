import { generateBasedOnCategory } from "@/components/Utils/utilsFunctions";
import { getSingleProduct } from "@/Store/productSlice/service/products.service";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { MdEdit } from "react-icons/md";
const SingleProductAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state?.productReducer?.singleProduct
  );
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  console.log(singleProduct);

  return (
    <>
      <Box w={"100%"} display={"flex"} justifyContent={"end"} mb={"1rem"}>
        <Button
          variant={"outline"}
          color={"text"}
          borderColor={"secondary"}
          px={"2rem"}
          fontSize={"1rem"}
          _hover={{ bgColor: "transparent" }}
        >
          <Span>
            <MdEdit />
          </Span>
          Edit
        </Button>
      </Box>
      <Box
        w={"100%"}
        h={"100%"}
        maxH={"880px"}
        display={"flex"}
        alignItems={"stretch"}
        gap={"1rem"}
      >
        <Box
          bgColor="white"
          p="1rem"
          borderRadius="10px"
          boxShadow="sm"
          w={"60%"}
          overflow={"hidden"}
        >
          <HStack w={"100%"} h={"500px"} p={"1rem"} alignItems={"flex-start"}>
            <Box
              w={"100%"}
              border={"1px solid #D1D5DB"}
              h={"100%"}
              overflow={"hidden"}
              borderRadius={"10px"}
              bgColor={"white"}
              transition={"all ease-in-out"}
              p={"1rem"}
            >
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"contain"}
                src={singleProduct?.productImages?.[currentImage]?.url}
                alt={`Image-${currentImage}`}
                objectPosition={"center"}
              />
            </Box>
            <SimpleGrid columns={"2"} w={"100%"} h={"100%"} gap={"1rem"}>
              {singleProduct?.productImages?.map((item, index) => (
                <Box
                  key={item?._id}
                  w={["100%"]}
                  h={"100%"}
                  transition={"all ease-in-out"}
                  border={
                    currentImage === index
                      ? "2px solid #FDBA74"
                      : "1px solid #D1D5DB"
                  }
                  borderRadius={"10px"}
                  overflow={"hidden"}
                  onMouseEnter={() => setCurrentImage(index)}
                  bgColor={"white"}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    objectFit={["cover", "cover", "cover", "contain"]}
                    src={item?.url}
                    alt={`Image-${currentImage}`}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </HStack>

          {/* Details */}

          <VStack alignItems={"flex-start"} p={"1rem"} w={"100%"} gap={"1rem"}>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Heading size={"2xl"}>{singleProduct?.name}</Heading>
              <Box fontSize={"1.5rem"} fontWeight={"semibold"}>
                ₹{singleProduct?.price?.toLocaleString()}
              </Box>
            </HStack>
            <HStack color={"text"}>
              <Text fontWeight={"semibold"}>
                Rating: {singleProduct?.rating}/5
              </Text>
              <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                Category: {singleProduct?.category}
              </Text>
              {singleProduct?.variant && (
                <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                  Variant:{" "}
                  {generateBasedOnCategory(
                    singleProduct?.category,
                    singleProduct?.variant
                  )}
                </Text>
              )}
              <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                Stock: {singleProduct?.stock}
              </Text>
              <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                Product Sold: {singleProduct?.productSold}
              </Text>
            </HStack>
            <Text maxH={"190px"} overflow={"auto"}>
              {singleProduct?.description}
            </Text>
          </VStack>
        </Box>

        <Box
          bgColor="white"
          p="1rem"
          borderRadius="10px"
          boxShadow="sm"
          w={"40%"}
        >
          <Heading size={'2xl'}>Comments</Heading>

          {singleProduct?.comments?.length === 0 ? (
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              fontWeight={"semibold"}
              maxH={"880px"}
            >
              No comments.
            </Box>
          ) : (
            <VStack
              w={"100%"}
              alignItems={"flex-start"}
              mt={"1rem"}
              gap={"2rem"}
              overflow={"auto"}
              h={"auto"}
            >
              {singleProduct?.comments?.map((comment) => (
                <VStack
                  key={comment?._id}
                  borderBottom={"1px solid #dddddd"}
                  w={"100%"}
                  alignItems={"flex-start"}
                >
                  <HStack>
                    <Box>
                      <Avatar.Root bgColor={"secondary"} size={"xl"}>
                        <Avatar.Fallback name={comment?.user?.username} />
                        <Avatar.Image src={comment?.user?.image?.url} />
                      </Avatar.Root>
                    </Box>

                    <VStack w={"100%"} alignItems={"flex-start"} gap={"0px"}>
                      <Text fontSize={"0.9rem"} fontWeight={"bold"}>
                        {`${
                          comment?.user?.username?.charAt(0)?.toUpperCase() +
                          comment?.user?.username?.slice(1)?.toLowerCase()
                        }${comment?.isDelete ? ` (You)` : ""}`}
                      </Text>
                      <Text fontSize={"0.8rem"} color={"text"}>
                        {moment(comment?.date).format("DD-MMM-YYYY hh:mm A")}
                      </Text>
                    </VStack>
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
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SingleProductAdmin;
