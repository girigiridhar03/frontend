import { login, register } from "@/Store/LoginSlice/service/Auth.service";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.authReducer?.isLoading);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    role: "user",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (location.pathname === "/login") {
      setLoginFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegisteration = async (e) => {
    e.preventDefault();

    console.log(formData);
    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(loginFormData));
    if (login.fulfilled.match(result)) {
      navigate("/");
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
        <Heading size={"3xl"}>
          {location.pathname === "/register"
            ? "Create Account."
            : location.pathname === "/login" && "Welcome Back!"}
        </Heading>
        {location.pathname === "/register" ? (
          <form className="w-[100%]" onSubmit={handleRegisteration}>
            <VStack w={"100%"} gap={"10px"}>
              <Field.Root required>
                <Field.Label>
                  Username <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>Profile Image</Field.Label>
                <Input type="file" name="image" onChange={handleChange} />
              </Field.Root>
              <Button
                type="submit"
                loading={loading}
                bgColor="accent"
                color="surface"
                w={"100%"}
              >
                Register
              </Button>
            </VStack>
          </form>
        ) : (
          location.pathname === "/login" && (
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
                  loading={loading}
                  bgColor="accent"
                  color="surface"
                  w={"100%"}
                >
                  Login
                </Button>
              </VStack>
            </form>
          )
        )}
        <Text>
          {location.pathname === "/register"
            ? " Already have an account ?"
            : location.pathname === "/login" && "Don't have an account ?"}{" "}
          <Link
            to={
              location.pathname === "/register"
                ? "/login"
                : location.pathname === "/login" && "/register"
            }
          >
            <Span color="accent">
              {" "}
              {location.pathname === "/register"
                ? "Login"
                : location.pathname === "/login" && "Register"}{" "}
            </Span>
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default UserLogin;
