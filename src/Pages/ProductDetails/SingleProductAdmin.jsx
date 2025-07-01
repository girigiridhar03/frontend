import { getSingleProduct } from "@/Store/productSlice/service/products.service";
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProductAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state?.productReducer?.singleProduct
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  console.log(singleProduct);

  return (
    <Box
      overflow="auto"
      bgColor="white"
      p="1rem"
      borderRadius="10px"
      boxShadow="sm"
    ></Box>
  );
};

export default SingleProductAdmin;
