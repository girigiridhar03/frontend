import React, { useState } from "react";
import { Box, Button, Field, Heading, Input, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "@/Store/LoginSlice/service/Auth.service";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state?.authReducer?.isLoading);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(adminLogin(loginFormData));
    console.log(result);
    if (adminLogin.fulfilled.match(result)) {
      console.log("true")
      navigate("/admin/dashboard");
    }
  };

  return (
    <Box
      w={"100%"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        bgColor="surface"
        maxW={"500px"}
        w={"95%"}
        p={"1.5rem"}
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        gap={"10px"}
        shadow="xs"
        borderRadius="10px"
      >
        <Heading size={"3xl"}>"Welcome Back!</Heading>

        <form className="w-[100%]" onSubmit={handleLogin}>
          <VStack w={"100%"} gap={"10px"}>
            <Field.Root required>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </Field.Root>

            <Button
              type="submit"
              bgColor="primary"
              color="text"
              loading={loading}
              w={"100%"}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;
