import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import axios from 'axios';
import { publicRequest } from "../../requestMethods";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  color: black;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
`;

const Heading = styled.tr`
  background-color: black;
  color: #fff;
  border: 1px solid #ddd;
  padding: 0.35em;
`;

const Rows = styled.tr`
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 0.35em;
`;

const Columns = styled.th`
  text-align: center;
  border: 1px solid #ddd;
  padding: 0.5em;
`;

const Value = styled.td`
  text-align: center;
  border: 1px solid #ddd;
  padding: 0.5em;
`;

const Dot = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Greendot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

const Yellowdot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: orange;
`;

const Purpledot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: purple;
`;

const Bluedot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: blue;
`;

const Reddot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(255, 81, 81);
`;

const Button = styled.button`
  padding: 5px 20px;
  margin: 0px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function YourOrders() {

  const [orders, setOrders] = useState([]);
  //const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.get(
          "/orders/me",
          { withCredentials: true }
        );
        setOrders(res.data);
        
        
      } catch (err) {console.error(err)}
      
    };
    getOrders();
  }, []);

  

  const data = [
    {
      id: 1,
      date: "12/12/2023",
      status: "Delivered",
      total: 2500,
    },
    {
      id: 2,
      date: "12/12/2023",
      status: "On the way",
      total: 1500,
    },
    {
      id: 3,
      date: "12/12/2023",
      status: "Delivered",
      total: 2000,
    },
    {
      id: 4,
      date: "12/12/2023",
      status: "Cancelled",
      total: 1750,
    },
    {
      id: 5,
      date: "12/12/2023",
      status: "Delivered",
      total: 2500,
    },
    {
      id: 6,
      date: "12/12/2023",
      status: "On the way",
      total: 1500,
    },
    {
      id: 7,
      date: "12/12/2023",
      status: "Delivered",
      total: 2000,
    },
    {
      id: 8,
      date: "12/12/2023",
      status: "Cancelled",
      total: 1750,
    },
  ];

  console.log(orders);

  return (
    <Container>
      <Title>Your Orders</Title>
      <TableContainer>
        <Table>
          <thead>
            <Heading>
              <Columns>Order Id</Columns>
              <Columns>Date</Columns>
              <Columns>Status</Columns>
              <Columns>Total</Columns>
              <Columns>Action</Columns>
            </Heading>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <Rows key={index}>
                  <Value data-label="OrderID">{item._id.substring(0,9)}</Value>
                  <Value data-label="OrderDate">{item.createdAt.split("T")[0]}</Value>
                  <Value data-label="Delivery Status">
                    <Dot>
                      {item.status === "Delivered" && <Greendot />}
                      {item.status === "On the way" && <Yellowdot />}
                      {item.status === "Cancelled" && <Reddot />}
                      {item.status === "pending" && <Purpledot />}
                      {item.status === "paid" && <Bluedot />}
                      {item.status}
                    </Dot>
                  </Value>
                  <Value data-label="Total">₹{item.amount/100}</Value>
                  <Value data-label="Invoice">
                    <Button>View</Button>
                  </Value>
                </Rows>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default YourOrders;
