import { adminAddProduct } from "@/Store/productSlice/service/products.service";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    variant: "",
    rating: "",
    section: "",
    stock: "",
    color: "",
    productImages: [],
    description: "",
  });

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    console.log(files);

    setFormData((prev) => {
      return {
        ...prev,
        [name]: files ? Array.from(files) : value,
      };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.entries(formData)?.forEach(([key, value]) => {
      if (key === "productImages") {
        value.forEach((file) => {
          formDataToSend.append("productImages", file);
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    dispatch(adminAddProduct(formDataToSend));
    setFormData({
      name: "",
      price: "",
      brand: "",
      category: "",
      variant: "",
      rating: "",
      section: "",
      stock: "",
      color: "",
      productImages: [],
      description: "",
    });
  };

  return (
    <Box
      w={"100%"}
      bgColor={"white"}
      boxShadow={"sm"}
      p={"1rem"}
      borderRadius={"10px"}
    >
      <Heading size={"2xl"}>Add Product Details</Heading>
      <form onSubmit={handleAddProduct}>
        <SimpleGrid w={"100%"} columns={2} mt={"1rem"} gap={"1rem"}>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              placeholder="Enter Name"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Price</Field.Label>
            <Input
              type="number"
              placeholder="Enter Price"
              name="price"
              value={formData.price}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Brand</Field.Label>
            <Input
              placeholder="Enter Brand"
              name="brand"
              value={formData.brand}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Category</Field.Label>
            <Input
              placeholder="Enter Category"
              name="category"
              value={formData.category}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Variant</Field.Label>
            <Input
              placeholder="Enter Variant"
              name="variant"
              value={formData.variant}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Rating</Field.Label>
            <Input
              type="number"
              placeholder="Enter Rating"
              name="rating"
              value={formData.rating}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Section</Field.Label>
            <Input
              placeholder="Enter Section"
              name="section"
              value={formData.section}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Stock</Field.Label>
            <Input
              placeholder="Enter Stock"
              name="stock"
              value={formData.stock}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Colour</Field.Label>
            <Input
              placeholder="Enter Colour"
              name="color"
              value={formData.color}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Product Images</Field.Label>
            <Input
              type="file"
              multiple
              name="productImages"
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              placeholder="Enter Description"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
            />
          </Field.Root>
        </SimpleGrid>
        <Button mt={"1rem"} bgColor={"secondary"} type="submit">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
