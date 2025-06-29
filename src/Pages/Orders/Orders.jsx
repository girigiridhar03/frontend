import { orderDetails } from "@/Store/OrderSlice/service/orders.service";
import { Box, Select, Table } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";
import StatusBadge from "@/components/Utils/StatusBadge";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data, totalOrders, totalPages } = useSelector(
    (state) => state?.orderReducer?.orderDetailsData
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    dispatch(orderDetails({ page, limit, status }));
  }, []);

  console.log(data);

  const orderStatusArray = [
    "pending",
    "processing",
    "out for delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <Box w={"100%"} h={"100%"}>
      <Box w={"100%"} display={"flex"} justifyContent={"flex-end"} mb={"1rem"}>
        <select
          style={{
            border: "2px solid grey",
            borderRadius: "5px",
            padding: ".3rem",
            width: "10%",
            textTransform: "capitalize",
          }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {orderStatusArray?.map((status,index) => (
            <option key={index} value={status} style={{ textTransform: "capitalize" }}>
              {status}
            </option>
          ))}
        </select>
      </Box>
      <Table.Root variant={"outline"} borderRadius={"10px"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign={"center"}>
              Order ID
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Customer
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Email</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Location
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Address
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              PinCode
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>
              Order Placed Date and Time
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((order) => (
            <Table.Row key={order?._id}>
              <Table.Cell textAlign={"center"}>#{order?.orderId}</Table.Cell>
              <Table.Cell textAlign={"center"}>
                {order?.userid?.username}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>
                {order?.userid?.email}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>{order?.location}</Table.Cell>
              <Table.Cell textAlign={"center"}>{order?.address}</Table.Cell>
              <Table.Cell textAlign={"center"}>{order?.pinCode}</Table.Cell>
              <Table.Cell textAlign={"center"}>
                {moment(order?.createdAt).format("DD-MMM-YYYY hh:mm A")}
              </Table.Cell>
              <Table.Cell textAlign={"center"}>
                <StatusBadge status={order?.status} />
              </Table.Cell>
              <Table.Cell textAlign={"center"}>
                <Link to={`/admin/order/${order?._id}`}>
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

export default Orders;
