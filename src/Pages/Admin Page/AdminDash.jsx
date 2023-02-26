import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteData,
  FilterData,
  getAdminData,
} from "../../Redux/Admin/admin.action";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Text,
  Heading,
  Button,
  Flex,
  Box,
  ButtonGroup,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import "../../CSS/AdminLoginPage.css";
import { useNavigate } from "react-router-dom";
const AdminDash = () => {
  const [total, setTotal] = React.useState(0);
  const Toast = useToast();
  const state = useSelector((store) => store.adminReducer);
  const val = state.data.data;
  console.log("val", val);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (id, price, title) => {};

  const handleDelete = (e) => {
    dispatch(deleteData(e));

    Toast({
      position: "top",
      description: "Data Successfully Deleted",
      title: "Data Deleted 😵😵",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSelectData = async (par) => {
    dispatch(FilterData(par));
    Toast({
      position: "top-right",
      description: `${par} Data You Can See`,
      title: `${par} Data `,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const ToTalData = () => {
    if (state.data.data) {
      setTotal(val.reduce((acc, el) => acc + Number(el.price), 0));
    } else {
      setTotal(0);
    }
  };

  setTimeout(() => {
    ToTalData();
  }, 100);

  React.useEffect(() => {
    dispatch(getAdminData());
    ToTalData();
  }, []);
  console.log("total", total);
  return (
    <div>
      <AdminNavbar />
      <Divider />
      <Divider />
      <Divider />
      <Box
        style={{
          height: "20px",
          width: "30%",
          margin: "auto",
        }}
      >
        <Flex
          style={{
            gap: "90px",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <ButtonGroup>
            <Button
              backgroundColor="rgb(244, 51, 151)"
              fontFamily={" 'Lobster Two', cursive"}
            >
              Total Products :
              {state.data.data && state.data.data.length
                ? state.data.data.length
                : 0}
            </Button>
            <Menu>
              <MenuButton
                px={9}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "rgb(153, 153, 153).400" }}
                _expanded={{ bg: "rgb(153, 153, 153).400" }}
                _focus={{ boxShadow: "outline" }}
                fontFamily={" 'Lobster Two', cursive"}
              >
                Category <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem
                  fontFamily={" 'Lobster Two', cursive"}
                  onClick={() => handleSelectData("men")}
                >
                  Men
                </MenuItem>
                <MenuItem
                  fontFamily={" 'Lobster Two', cursive"}
                  onClick={() => handleSelectData("women")}
                >
                  Women
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  fontFamily={" 'Lobster Two', cursive"}
                  onClick={() => handleSelectData("Beauty & Health")}
                >
                  {" "}
                  Cosmatics
                </MenuItem>
                <MenuItem fontFamily={" 'Lobster Two', cursive"}>
                  Jewellery and Accessories
                </MenuItem>
                <MenuItem fontFamily={" 'Lobster Two', cursive"}>
                  FootWear
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              fontFamily={" 'Lobster Two', cursive"}
              backgroundColor="rgb(244, 51, 151)"
            >
              Total Inventory : ₹{total}
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          width: "80%",
          margin: "auto",
          gap: "30px",
          border: "14px",
        }}
      >
        {state.data.data &&
          state.data.data.reverse().map((el) => {
            return (
              <Card maxW="sm" className="media_change" key={el.id}>
                <CardBody>
                  <Box>
                    <Box dispatch="relative" className="BeforeHover">
                      <Image
                        src={el.image}
                        alt={el.title}
                      
                        className="BeforeHover"
                      />
                    </Box>
                    <Box
                      _hover={{ display: "none" }}
                      position={"absolute"}
                      top="0px"
                      left="0px"
                      className="delayImagevalue"
                    >
                      <Image
                        justifyContent={"center"}
                        src={el.image2}
                        
                        className="delayImagevalue"
                      />
                    </Box>
                  </Box>
                  <br/>
                  <br/>
                  <Stack mt="6" spacing="3">
                    <Heading size="md" fontFamily={" 'Lobster Two', cursive"}>
                      {el.category}
                    </Heading>
                    <Text
                      fontSize={"xl"}
                      style={{
                        color: " rgb(153, 153, 153)",
                        fontWeight: "400",
                      }}
                      fontFamily={" 'Lobster Two', cursive"}
                    >
                      {el.title}
                    </Text>
                    <Text
                      style={{ fontWeight: "700" }}
                      color="rgb(51, 51, 51)"
                      fontSize="2xl"
                    >
                      <span fontFamily={"'Lobster Two', cursive"}>Price ₹</span>{" "}
                      {el.price}
                    </Text>

                    <Text
                      fontFamily={" 'Lobster Two', cursive"}
                      color="blue.600"
                      fontSize="2xl"
                    >
                      <span
                        fontFamily={" 'Lobster Two', cursive"}
                        style={{ fontWeight: "700" }}
                      >
                        Tag
                      </span>{" "}
                      {el.tag}
                    </Text>
                    <Flex
                      style={{ gap: "20px", justifyContent: "space-evenly" }}
                    >
                      <Text
                        fontFamily={" 'Lobster Two', cursive"}
                        color="blue.600"
                        fontSize="2xl"
                      >
                        {el.reviews}
                      </Text>

                      <Button
                        style={{ border: "18px 12px" }}
                        bg={"rgb(244, 51, 151)"}
                        className="btn_Hover"
                        fontFamily={" 'Lobster Two', cursive"}
                      >
                        <Text
                          fontFamily={" 'Lobster Two', cursive"}
                          color="#ffff"
                          fontSize="2xl"
                        >
                          {el.rating}
                        </Text>
                      </Button>
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      bg={"rgb(244, 51, 151)"}
                      color={"#ffff"}
                      className="btn_Hover"
                      onClick={() => handleDelete(el.id)}
                      fontFamily={" 'Lobster Two', cursive"}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="solid"
                      bg={"rgb(244, 51, 151)"}
                      color={"#ffff"}
                      className="btn_Hover"
                      onClick={() => handleUpdate(el.id, el.price, el.title)}
                      fontFamily={" 'Lobster Two', cursive"}
                    >
                      Update
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Box>
    </div>
  );
};

export default AdminDash;
