import {
  Heading,
  Stack,
  Text,
  Divider,
  Button,
  Box,
  HStack,
  Image,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const CartItems = ({ objProp, funcProp, funcquant }) => {
  const { orderId, title, price, quantity, image } = objProp;

  return (
    <Card h="420px">
      <CardBody h="85%">
        <Image w="90%" h="70%" src={image} alt="error" borderRadius="lg" />
        <Stack mt="2" spacing="1">
          <Heading textAlign={"left"} color="#999" noOfLines={2} size="md">
            {title}
          </Heading>

          <Text align={"center"} color="blue.600" fontSize="2xl">
            ₹{price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack justifyContent={"space-between"} gap="20px">
          <Button
            onClick={() => funcProp(orderId)}
            variant="solid"
            colorScheme="blue"
          >
            <DeleteIcon />
          </Button>
          <HStack>
            <Button
              isDisabled={quantity === 1}
              bgColor="#3182ce"
              w="10px"
              color="white"
              onClick={() => funcquant(orderId, -1)}
              variant="ghost"
              colorScheme="blue"
            >
              -
            </Button>
            <Box>{quantity}</Box>
            <Button
              isDisabled={quantity === 3}
              bgColor="#3182ce"
              w="10px"
              color="white"
              onClick={() => funcquant(orderId, 1)}
              variant="ghost"
              colorScheme="blue"
            >
              +
            </Button>
          </HStack>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default CartItems;
