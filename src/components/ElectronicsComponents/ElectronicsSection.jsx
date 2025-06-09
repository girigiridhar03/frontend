import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Pagination,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getCategories,
} from "@/Store/productSlice/service/products.service";
import CardComponent from "../Utils/CardComponent";
import { useLocation } from "react-router-dom";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ElectronicsSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.productReducer?.categories);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const allElectronics = useSelector(
    (state) => state?.productReducer?.allelectronicsProduct
  );

  const location = useLocation();

  const totalProducts = useSelector(
    (state) => state?.productReducer?.totalProducts
  );

  const { totalProducts: count } = useSelector(
    (state) => state?.productReducer?.pagination
  );

  useEffect(() => {
    dispatch(getCategories(location.pathname.split("/")[1]));
    dispatch(
      getAllProducts({
        section: location.pathname.split("/")[1],
        brand: selectedCard,
        page: selectedPage,
        limit: 10,
      })
    );
  }, [dispatch, selectedCard, selectedPage]);

  console.log(selectedPage);

  return (
    <HStack
      w={"100%"}
      gap={"2rem"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      position={"relative"}
    >
      {/* Categories */}
      <VStack
        position={"fixed"}
        top={"10rem"}
        border={"1px solid #D1D5DB"}
        bgColor={"surface"}
        borderRadius={"10px"}
        boxShadow={"inset"}
        w={"22%"}
        alignItems={"flex-start"}
        p={"1rem"}
        gap={"1.5rem"}
      >
        <Heading size={"2xl"} fontWeight={"bold"}>
          Category
        </Heading>
        <Box bgColor={"muted"} w={"100%"} borderRadius={"5px"}>
          <Box
            border={"2px solid #3B82F6"}
            w={"20%"}
            borderRadius={"5px"}
          ></Box>
        </Box>
        {categories?.map((item, index) => {
          const mapKey = index;
          return (
            <HStack
              key={mapKey}
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              border={"1px solid #D1D5DB"}
              p={"0.8rem"}
              borderRadius={"8px"}
              className={`${
                selectedCard === item?.category
                  ? "selected-category-cart"
                  : "category-card"
              }`}
              onClick={() => setSelectedCard(item?.category)}
            >
              <Text
                fontWeight={"semibold"}
                className={`${
                  selectedCard === item?.categories
                    ? "selected-text"
                    : "category-text"
                }`}
              >
                {item?.category}
              </Text>
              <Box
                className={`${
                  selectedCard === item?.category
                    ? "selected-badge"
                    : "category-badge"
                }`}
                w={"20px"}
                h={"20px"}
                borderRadius={"50%"}
                fontSize={".8rem"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {item?.totalProducts}
              </Box>
            </HStack>
          );
        })}
      </VStack>

      {/* List Cards */}

      <VStack
        w={"75%"}
        gap={"2rem"}
        marginLeft={"30%"}
        alignItems={"flex-start"}
      >
        {/* Heading */}
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text fontWeight={'semibold'}>
            We found <Span color={"accent"}>{totalProducts}</Span> items for
            you!
          </Text>
          <HStack gap={"2rem"}>
            <Box border={"1px solid #D1D5DB"}>SHOW</Box>
            <Box border={"1px solid #D1D5DB"}>sortby</Box>
          </HStack>
        </HStack>

        <VStack w={"100%"} gap={"2rem"}>
          {allElectronics?.map((item) => (
            <Box key={item?._id} w={"100%"}>
              <CardComponent product={item} />
            </Box>
          ))}
        </VStack>

        <Pagination.Root count={count} pageSize={10} defaultPage={1}>
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton color={"text"}>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => {
                return (
                  <IconButton
                    variant={{ base: "outline", _selected: "solid" }}
                    color={page.value === selectedPage ? "surface" : "text"}
                    bgColor={page.value === selectedPage && "accent"}
                    _hover={{
                      bgColor: "accent",
                      color: "surface",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={() => setSelectedPage(page.value)}
                  >
                    {page.value}
                  </IconButton>
                );
              }}
            />

            <Pagination.NextTrigger asChild>
              <IconButton color={"text"}>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </VStack>
    </HStack>
  );
};

export default ElectronicsSection;
