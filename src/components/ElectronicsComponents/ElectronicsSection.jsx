import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  IconButton,
  Pagination,
  Select,
  SimpleGrid,
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
import { BiSortDown } from "react-icons/bi";
import { BsFilterSquare } from "react-icons/bs";

const ElectronicsSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.productReducer?.categories);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
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
        category: selectedCard,
        page: selectedPage,
        limit: 10,
      })
    );
  }, [dispatch, selectedCard, selectedPage]);

  return (
    <HStack
      w={"100%"}
      gap={"2rem"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      position={"relative"}
      flexDirection={{ base: "column" }}
    >

      {/* List Cards */}

      <VStack w={"100%"} gap={"2rem"} alignItems={"flex-start"}>

        {/* Heading */}
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Text fontWeight={"semibold"} fontSize={'1.4rem'}>
            We found <Span color={"secondary"}>{totalProducts}</Span> items for
            you!
          </Text>
          <Box fontSize={'1.5rem'}>
            <BsFilterSquare />
          </Box>
        </HStack>

        <SimpleGrid columns={[1,1,2,3,4]} w={"100%"} gap={['2rem','2rem','1.5rem','1rem']}>
          {allElectronics?.map((item) => (
            <Box key={item?._id} w={"100%"}>
              <CardComponent product={item} />
            </Box>
          ))}
        </SimpleGrid>

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
                    color={page.value === selectedPage ? "secondary" : "text"}
                    bgColor={page.value === selectedPage && "rgb(236, 72, 153,0.3)"}
                    _hover={{
                      bgColor: "rgb(236, 72, 153,0.3)",
                      color: "secondary",
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
