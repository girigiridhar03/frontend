import { generateBasedOnCategory } from "@/components/Utils/utilsFunctions";
import {
  agentDetails,
  getSingleUser,
} from "@/Store/DashboardSlice/service/dashboard.service";
import { Avatar, Box, Heading, HStack, Table, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const SingleUserDetails = () => {
  const { id, role } = useParams();
  const dispatch = useDispatch();
  const getsingleuser = useSelector(
    (state) => state?.dashboardReducer?.getsingleuser
  );
  const getSingleAgent = useSelector(
    (state) => state?.dashboardReducer?.getSingleAgent
  );

  useEffect(() => {
    if (role === "user") {
      dispatch(getSingleUser(id));
      return;
    }

    if (role === "agent") {
      dispatch(agentDetails(id));
    }
  }, [id, role]);

  console.log(getsingleuser, getSingleAgent);

  return (
    <Box w={"100%"} gap={"1rem"}>
      <Box
        bgColor="white"
        p="1rem"
        borderRadius="30px"
        boxShadow="sm"
        w={"50%"}
        mx={"auto"}
      >
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Heading size={"3xl"}>
            {role === "user" ? "User Details" : "Agent Details"}
          </Heading>
          <Box
            textTransform={"capitalize"}
            bgColor={"primary"}
            px={"1rem"}
            py={"0.3rem"}
            color={"white"}
            fontWeight={"semibold"}
            borderRadius={"10px"}
            fontSize={"1.1rem"}
          >
            {role}
          </Box>
        </HStack>
        <VStack w={"100%"} mt={"1rem"}>
          <Avatar.Root w={"250px"} h={"250px"}>
            <Avatar.Fallback
              fontSize={"2.5rem"}
              name={
                role === "agent"
                  ? getSingleAgent?.agent?.username
                  : getsingleuser?.username
              }
            />
            <Avatar.Image
              src={
                role === "agent"
                  ? getSingleAgent?.agent?.image?.url
                  : getsingleuser?.image?.url
              }
            />
          </Avatar.Root>
          <Heading size={"2xl"} textTransform={"capitalize"}>
            {role === "agent"
              ? getSingleAgent?.agent?.username
              : getsingleuser?.username}
          </Heading>
          <Text fontWeight={'semibold'}>
            {role === "agent"
              ? getSingleAgent?.agent?.email
              : getsingleuser?.email}
          </Text>
        </VStack>
      </Box>

      <Box
        bgColor="white"
        p="1rem"
        borderRadius="10px"
        boxShadow="sm"
        w={"100%"}
        mt={"2rem"}
      >
        <Heading size={"2xl"}>
          {role === "agent" ? "Assigned Orders" : "Cart Items"}
        </Heading>
        {role === "agent" && (
          <VStack mt={"1rem"} w={"100%"} maxH={"430px"}>
            <Table.Root
              variant={"outline"}
              borderRadius={"10px"}
              h={"auto"}
              overflow={"auto"}
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>OrderId</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Name
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Email
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Products Count
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Action
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {getSingleAgent?.orders?.map((item) => (
                  <Table.Row key={item?._id}>
                    <Table.Cell>#{item?.orderId}</Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {item?.userid?.username}
                    </Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      {item?.userid?.email}
                    </Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      {item?.products?.length}
                    </Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      <Link to={`/admin/order/${item?._id}`}>
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
          </VStack>
        )}
        {role === "user" && (
          <VStack mt={"1rem"} w={"100%"} maxH={"430px"}>
            <Table.Root
              variant={"outline"}
              borderRadius={"10px"}
              h={"auto"}
              overflow={"auto"}
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>ProductId</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Name
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Price
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Qty
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={"center"}>
                    Variant
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {getsingleuser?.cartItems?.map((item) => (
                  <Table.Row key={item?._id}>
                    <Table.Cell>{item?._id}</Table.Cell>
                    <Table.Cell textAlign={"center"}>{item?.name}</Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      {item?.price?.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      {item?.quantity}
                    </Table.Cell>
                    <Table.Cell textAlign={"center"}>
                      {generateBasedOnCategory(item?.category, item?.variant)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default SingleUserDetails;
