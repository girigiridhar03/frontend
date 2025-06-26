import { Box, Table } from '@chakra-ui/react'
import React from 'react'

const Users = () => {
    console.log(Table); 
  return (
    <Box>
        <Table.Root bg={'white'}>
             <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
        </Table.Root>
    </Box>
  )
}

export default Users
