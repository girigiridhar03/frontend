import StatusBadge from "@/components/Utils/StatusBadge";
import {
  assignOrderToAgent,
  getSingleOrderDetails,
  updateOrderStatus,
} from "@/Store/OrderSlice/service/orders.service";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Span,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { getUsersAndAgent } from "@/Store/DashboardSlice/service/dashboard.service";
const SingleOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleOrder = useSelector((state) => state?.orderReducer?.singleOrder);
  const agentsData = useSelector(
    (state) => state?.dashboardReducer?.usersandagent
  );

  const [orderStatus, setOrderStatus] = useState([
    "pending",
    "processing",
    "cancelled",
  ]);

  useEffect(() => {
    dispatch(getSingleOrderDetails(id));
    dispatch(getUsersAndAgent("agent"));
  }, [id]);

  useEffect(() => {
    if (!singleOrder?.status) return;
    let updatedArr = orderStatus.filter((item) => item !== singleOrder?.status);

    updatedArr?.unshift(singleOrder?.status);

    setOrderStatus(updatedArr);
  }, [singleOrder]);

  const handleChangeAgent = async (e) => {
    if (e.target.value === "") return;
    const result = await dispatch(
      assignOrderToAgent({
        orderId: id,
        agentId: e.target.value,
      })
    );

    if (assignOrderToAgent.fulfilled.match(result)) {
      dispatch(getSingleOrderDetails(id));
    }
  };

  const handleUpdateStatus = async (e) => {
    if (e.target.value === "") return;

    const result = await dispatch(
      updateOrderStatus({ orderId: id, status: e.target.value })
    );

    if (updateOrderStatus.fulfilled.match(result)) {
      dispatch(getSingleOrderDetails(id));
    }
  };

  return (
    <Box
      display={"flex"}
      w={"100%"}
      alignItems="stretch"
      gap={"1rem"}
      maxH="880px"
      h="100%"
    >
      {/* Order Details */}
      <VStack
        w={"60%"}
        flex="1"
        maxH="880px"
        overflow="auto"
        bgColor="white"
        p="1rem"
        borderRadius="10px"
        boxShadow="sm"
      >
        <HStack w={"100%"} justifyContent={"space-between"}>
          <Heading size={"3xl"}>
            Order ID <Span color={"secondary"}>#{singleOrder?.orderId}</Span>
          </Heading>
          <StatusBadge status={singleOrder?.status} />
        </HStack>
        <VStack
          w="100%"
          alignItems="flex-start"
          p="1rem"
          h="100%"
          display="flex"
        >
          <Heading size="xl" color="text">
            Order List
          </Heading>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader fontSize="1.1rem" color="text">
                  Product
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontSize="1.1rem"
                  color="text"
                >
                  Qty
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontSize="1.1rem"
                  color="text"
                >
                  Price
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontSize="1.1rem"
                  color="text"
                >
                  Total
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {singleOrder?.products?.map((product) => (
                <Table.Row key={product?._id}>
                  <Table.Cell>
                    <HStack>
                      <Box w="200px" h="200px" overflow="hidden">
                        <Image
                          w="100%"
                          h="100%"
                          objectFit="contain"
                          src={product?.productId?.productImages[0]?.url}
                        />
                      </Box>
                      <VStack alignItems="flex-start" gap=".2rem">
                        <Heading size="md">{product?.productId?.name}</Heading>
                        <Text>{product?.productId?.category}</Text>
                        <Text>{product?.productId?.color}</Text>
                        <Text>{product?.productId?.variant}</Text>
                      </VStack>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Text fontSize="1.1rem">{product?.quantity}</Text>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Text fontSize="1.1rem">
                      ₹{product?.productId?.price?.toLocaleString()}
                    </Text>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Text fontSize="1.1rem">
                      ₹{product?.productId?.price?.toLocaleString()}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          {/* Push this to bottom */}
          <HStack
            w="100%"
            justifyContent="end"
            gap="1rem"
            fontSize="1.2rem"
            fontWeight="semibold"
            mt="auto" // 👈 This is what pushes it to bottom
          >
            <Text color="text">Total Amount</Text>
            <Text>₹{singleOrder?.totalPrice?.toLocaleString()}</Text>
          </HStack>
        </VStack>
      </VStack>

      {/* User Details */}
      <VStack
        w={"40%"}
        maxH="880px"
        bgColor="white"
        p="1.5rem"
        borderRadius="10px"
        boxShadow="sm"
        gap={"1.5rem"}
      >
        <Heading textAlign={"left"} w={"100%"} size={"4xl"}>
          Customer
        </Heading>
        <Box>
          <Avatar.Root w={"150px"} h={"150px"}>
            <Avatar.Fallback
              name={singleOrder?.userid?.username}
              fontSize={"2.5rem"}
            />
            <Avatar.Image src={singleOrder?.userid?.image?.url} />
          </Avatar.Root>
        </Box>
        <Text
          textTransform={"capitalize"}
          fontSize={"2rem"}
          fontWeight={"semibold"}
          color={"text"}
        >
          {singleOrder?.userid?.username}
        </Text>
        <VStack w={"100%"} alignItems={"flex-start"} spacing="1rem">
          <HStack fontSize={"1.2rem"}>
            <Box>
              <FaLocationDot />
            </Box>
            <Box>
              {singleOrder?.location},{singleOrder?.address} (
              {singleOrder?.pinCode})
            </Box>
          </HStack>
          <HStack fontSize={"1.2rem"}>
            <Box>
              <MdEmail />
            </Box>
            <Box>{singleOrder?.userid?.email}</Box>
          </HStack>
        </VStack>

        <hr
          style={{ marginTop: "1rem", borderColor: "#dddddd", width: "100%" }}
        />

        <VStack w="100%" spacing="1rem" alignItems="flex-start" gap={"1rem"}>
          <Heading size="2xl">Admin Actions</Heading>

          <Box w="100%">
            <Text mb="0.5rem" fontWeight="semibold" fontSize={"1.1rem"}>
              Update Status
            </Text>
            <select
              placeholder="Select status"
              style={{
                border: "2px solid grey",
                borderRadius: "5px",
                padding: ".3rem",
                width: "50%",
                textTransform: "capitalize",
              }}
              disabled={singleOrder?.status === "delivered"}
              onChange={handleUpdateStatus}
            >
              {orderStatus.map((item) => {
                return (
                  <option
                    value={item}
                    key={item}
                    style={{ textTransform: "capitalize" }}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </Box>

          <Box w="100%">
            <Text mb="0.5rem" fontWeight="semibold" fontSize={"1.1rem"}>
              Assign Delivery Agent
            </Text>
            <select
              style={{
                border: "2px solid grey",
                borderRadius: "5px",
                padding: ".3rem",
                width: "50%",
                textTransform: "capitalize",
              }}
              onChange={handleChangeAgent}
              disabled={singleOrder?.isAssign}
            >
              {singleOrder?.isAssign && (
                <option value="">{singleOrder?.deliveryAgent?.username}</option>
              )}

              <option value="">All Agents</option>

              {/* Actual agent options */}
              {agentsData.map((agent) => (
                <option
                  value={agent._id}
                  key={agent._id}
                  hidden={singleOrder?.isAssign}
                >
                  {agent.username}
                </option>
              ))}
            </select>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SingleOrder;
