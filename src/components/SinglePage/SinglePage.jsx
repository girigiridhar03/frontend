import {
  addComment,
  addToCart,
  deleteComment,
  getProductsByGroupId,
  getSingleProduct,
} from "@/Store/productSlice/service/products.service";
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
  SimpleGrid,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CardComponent from "../Utils/CardComponent";

const tabs = ["Descriptioin", "Comments"];

const SinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const menuRef = useRef();
  const singleProduct = useSelector(
    (state) => state?.productReducer?.singleProduct
  );
  const getProductsByGrpId = useSelector(
    (state) => state?.productReducer?.getProductsByGrpId
  );


  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!singleProduct?.groupId) return;
    dispatch(getProductsByGroupId(singleProduct?.groupId));
  }, [singleProduct]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteComment = async (e, commentId) => {
    e.stopPropagation();

    const result = await dispatch(deleteComment({ id, commentId }));

    if (deleteComment.fulfilled.match(result)) {
      dispatch(getSingleProduct(id));
    }
    setOpenMenu(null);
  };

  const handleAddComment = async () => {
    const result = await dispatch(addComment({ id, comment }));

    if (addComment.fulfilled.match(result)) {
      dispatch(getSingleProduct(id));
    }

    setComment("");
  };

  const handleAddCart = () => { 
    dispatch(addToCart({ productId: id, quantity }));
  };

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
        <HStack
          w={"100%"}
          h={{ lg: "500px", xl: "600px" }}
          alignItems={"flex-start"}
          gap={["1.5rem", "1.5rem", "1.5rem", "1rem"]}
          flexDirection={["column", "column", "column", "row"]}
        >
          {/* Left VStack */}
          <VStack
            w={["100%", "100%", "100%", "55%", "50%"]}
            h={["450px", "500px", "500px", "100%"]}
            p={"1rem"}
            alignItems={"flex-start"}
            flexDirection={[
              "row-reverse",
              "row-reverse",
              "row-reverse",
              "column",
            ]}
          >
            <Box
              w={["65%", "70%", "80%", "100%"]}
              border={"1px solid #D1D5DB"}
              height={["100%", "100%", "100%", "800px"]}
              overflow={"hidden"}
              borderRadius={"10px"}
              bgColor={"white"}
              transition={"all ease-in-out"}
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
            <HStack
              flexDirection={["column", "column", "column", "row"]}
              w={["35%", "30%", "20%", "100%"]}
              h={["100%", "100%", "100%", "300px"]}
            >
              {singleProduct?.productImages?.map((item, index) => (
                <Box
                  key={item?._id}
                  w={["100%"]}
                  h={("150px", "150px", "150px", "100%")}
                  transition={"all ease-in-out"}
                  border={
                    currentImage === index
                      ? "2px solid #EC4899"
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
            </HStack>
          </VStack>

          {/* Right VStack */}
          <VStack
            w={["100%", "100%", "100%", "45%", "50%"]}
            alignItems="flex-start"
            p={"1rem"}
            height={"100%"}
            gap={["0.5rem"]}
          >
            {/* Heading */}
            <Heading size={["3xl", "3xl", "3xl", "2.5xl"]}>
              {singleProduct?.name}
            </Heading>

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
            <VStack alignItems={"flex-start"} gap={["0.2rem"]}>
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

            {/* button and input controller */}
            <HStack gap={"1rem"} mt={"auto"}>
              <NumberInput.Root
                value={quantity}
                defaultValue={1}
                onValueChange={(e) => setQuantity(e.valueAsNumber)}
                min={1}
                max={100}
                width="100px"
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>

              <Button
                bgColor={"rgb(236, 72, 153,0.3)"}
                color={"secondary"}
                fontWeight={"bold"}
                onClick={handleAddCart}
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
          paddingTop={["1rem"]}
          paddingInline={["1rem"]}
          border={"1px solid #D1D5DB"}
          borderRadius={"10px"}
          gap={["1rem", "1rem", "1rem", "1.8rem"]}
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
                  fontSize={["0.9rem", "0.9rem", "0.9rem", "1rem"]}
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
                  <Text
                    key={mapKey}
                    fontSize={["0.8rem", "0.8rem", "0.8rem", "1rem"]}
                  >
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
                paddingInline={[
                  "0.2rem",
                  "0.2rem",
                  "0.2rem",
                  "0.7rem",
                  "1.5rem",
                ]}
              >
                {singleProduct?.comments?.length > 0 ? (
                  singleProduct?.comments?.map((comment, index) => (
                    <VStack
                      ref={openMenu === index ? menuRef : null}
                      key={comment?._id}
                      alignItems={"flex-start"}
                      w={"100%"}
                      position={"relative"}
                    >
                      {openMenu === index && (
                        <VStack
                          bgColor={"rgb(236, 72, 153,0.3)"}
                          position={"absolute"}
                          right={-3}
                          top={9}
                          p={".5rem"}
                          borderRadius={"10px"}
                        >
                          <Button w={"100%"} color={"secondary"}>
                            <Span>
                              <MdEdit />
                            </Span>
                            Edit
                          </Button>
                          <Button
                            w={"100%"}
                            color={"secondary"}
                            onClick={(e) =>
                              handleDeleteComment(e, comment?._id)
                            }
                          >
                            <Span>
                              <MdDelete />
                            </Span>
                            Delete
                          </Button>
                        </VStack>
                      )}
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
                          <Box
                            cursor={"pointer"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(index);
                            }}
                          >
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  bgColor={"rgb(236, 72, 153,0.3)"}
                  color={"secondary"}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                  onClick={handleAddComment}
                >
                  Add
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>

        {/* Related Products */}

        {getProductsByGrpId?.length > 0 && (
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Heading size={"3xl"}>Related Products</Heading>
            <SimpleGrid
              columns={[1, 1, 2, 3, 4]}
              w={"100%"}
              gap={["2rem", "2rem", "1.5rem", "1rem"]}
            >
              {getProductsByGrpId?.map((item) => {
                return (
                  <Box key={item?._id} w={"100%"}>
                    <CardComponent product={item} />
                  </Box>
                );
              })}
            </SimpleGrid>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default SinglePage;
