import { getUsersAndAgent } from "@/Store/DashboardSlice/service/dashboard.service";
import { Box, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const usersandagent = useSelector(
    (state) => state?.dashboardReducer?.usersandagent
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getUsersAndAgent(filter));
  }, [filter]);

  return (
    <Box>
      <Table.Root variant={'outline'} borderRadius={'10px'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>S.No</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Name</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Email</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Role</Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersandagent
            ?.filter((item) => item?.role !== "admin")
            ?.map((item, index) => (
              <Table.Row key={item?._id}>
                <Table.Cell>{index + 1}.</Table.Cell>
                <Table.Cell textAlign={"center"}>
                  {item?.username?.slice(0, 1)?.toUpperCase() +
                    item?.username?.slice(1)}
                </Table.Cell>
                <Table.Cell textAlign={"center"}>{item?.email}</Table.Cell>
                <Table.Cell textAlign={"center"}>
                  {item?.role?.slice(0, 1)?.toUpperCase() +
                    item?.role?.slice(1)}
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                 <Link to={`/admin/singleuserdetails/${item?._id}/${item?.role}`}>
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

export default Users;
