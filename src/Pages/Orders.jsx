import React from "react";
import { useSelector } from "react-redux";
import Ordercard from "../Components/Ordercard";
import { Grid, Heading } from "@chakra-ui/react";
const Orders = () => {
  const orders = useSelector((state) => state.Auth.currentUser.order);
  return (
    <>
      <Heading mt="20px" color="#161636" fontSize={"30px"}>Your Orders</Heading>
      <Grid
        w="90%"
        m="auto"
        h="auto"
        p="10px 40px"
        templateColumns={{base:"repeat(1,90%)",md:"repeat(2,50%)",lg:"repeat(3,20%)"}}
        gap="40px"

        mt="30px"
      >
        {orders && orders.map((e) => <Ordercard {...e} />)}
      </Grid>
    </>
  );
};

export default Orders;
