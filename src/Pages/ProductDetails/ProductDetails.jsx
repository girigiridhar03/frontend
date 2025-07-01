import { generateBasedOnCategory } from "@/components/Utils/utilsFunctions";
import { getAllProducts } from "@/Store/productSlice/service/products.service";
import { Box, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [section, setSectioin] = useState("");
  const [category, setCategory] = useState("");
  const limit = 10;
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state?.productReducer?.allelectronicsProduct
  );

  useEffect(() => {
    dispatch(getAllProducts({ section, category, page, limit }));
  }, [section, category, limit, page]);

  console.log(allProducts);

  return (
    <Box w={"100%"} h={"100%"}>
      <Table.Root variant={"outline"} borderRadius={"10px"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Variant
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Colour</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Section
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Stock</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Product Sold
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Rating</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allProducts?.map((product) => (
            <Table.Row key={product?._id}>
              <Table.Cell>{product?.name}</Table.Cell>
              <Table.Cell>
                {product?.description?.length >= 50
                  ? `${product?.description?.slice(0, 51)}...`
                  : product?.description}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.category}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>
                ₹{product?.price?.toLocaleString()}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>
                {product?.variant
                  ? generateBasedOnCategory(product?.category, product?.variant)
                  : "NA"}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.color}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.section}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.stock}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.productSold}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                {product?.rating}
              </Table.Cell>
              <Table.Cell textAlign={"center"} textTransform={"capitalize"}>
                <Link to={`/admin/singleproduct/${product?._id}`}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  cursor={"pointer"}
                >
                  <FaEye />
                </Box>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ProductDetails;
