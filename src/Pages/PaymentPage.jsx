import React, { useState } from "react";
// import styles from "../CSS/PaymentPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_SUCCESS } from "../Redux/Auth/auth.types";
import { useNavigate } from "react-router-dom";
import { Box, Text, HStack, VStack, Input, Select, Button, useToast,Stack, Image, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaAddressCard } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FormControl, FormLabel} from "@chakra-ui/react";

const PaymentPage = () => {
  const userId = useSelector((state) => state.Auth.currentUser.id);
  const cartItems = useSelector((state) => state.Auth.currentUser.cart);
  const total = useSelector((state) => state.productReducer.totalPrice);

 const [page,setPage] = useState(false)
 const [pay,setPay] = useState("")
 const [cardnum,setCardNum] = useState("")
 const toast =  useToast()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartDetails = async () => {
    try {
      let r = await fetch(
        `https://onestoredata.onrender.com/login/${userId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            cart: [],
            order: [...cartItems],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let d = await r.json();
      localStorage.setItem("user",JSON.stringify(d))
      dispatch({ type: AUTH_SUCCESS, payload: d });
      
    } catch (error) {
      console.log(error);
    }
    // setTimeout(()=>{
    //   dispatch(getUsersData())
    // },1500)
  };

  const handlesubmit = () => {
    // e.preventDefault();
    
    toast({
      position:"top",
      title: 'Payment Successful',
      description: "Thank You for Shopping",
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    cartDetails();
    navigate("/order");
  };

  return (
    <>
      {/* <div className={styles.container}>
        <div className={styles.left}>
          <h3 className={styles.header}>Billing Address</h3>

          <form>
            Full Name:
            <input type="text" name="" placeholder="Enter Name" />
            Email
            <input type="text" name="" placeholder="Enter Email" />
            Address:
            <input type="text" name="" placeholder="Enter Address" />
            City:
            <input type="text" name="" placeholder="Enter City" />
            <div className={styles.zip}>
              <label>
                State:
                <select>
                  <option value="">Choos State..</option>
                  <option value="">Jharkhand</option>
                  <option value="">Delhi</option>
                  <option value="">Uttar Pradesh</option>
                  <option value="">Madhya Pradesh</option>
                </select>
              </label>

              <label>
                Zipcode:
                <input type="number" placeholder="ZipCode" />
              </label>
            </div>
          </form>
        </div>

        <div className={styles.right}>
          <h3 className={styles.header}>Payment</h3>

          <form>
            Accepted Cards:
            <img
              src="./visa.png"
              alt=""
              style={{ width: "100px", marginTop: "2%" }}
            />
            <br />
            <br />
            Credit Card Number
            <input type="text" name="" placeholder="Enter card number" />
            Exp Month
            <input type="text" name="" placeholder="Enter month" />
            <div className={styles.zip}>
              <label>
                Exp Year
                <select>
                  <option value="">Choos Year</option>
                  <option value="">2023</option>
                  <option value="">2024</option>
                  <option value="">2025</option>
                  <option value="">2026</option>
                </select>
              </label>

              <label>
                CVV:
                <input type="number" placeholder="CVV" />
              </label>
            </div>
            <input
              type="submit"
              onClick={(e) => handlesubmit(e)}
              value="Proceed to checkout"
            />
          </form>
        </div>
      </div> */}
      
      <Box mt="30px" mb="30px">
        
        <HStack w={{base:"60%",md:"60%",lg:"20%"}} m="auto" gap="0px">
          
          <Box h="50px" w="80px" border="3px solid teal" borderRadius={"20px"} onClick={()=> setPage(false)}>
            <FaAddressCard
              style={{ margin: "auto", marginTop: "15%" }}
              color="teal"
              size="30px"
            />
          </Box>

          
          <Box w="70%" border="1px solid" borderColor={page? "teal" : "gray.300"}></Box>
          
          <Box h="50px" w="80px" border="3px solid" borderColor={page? "teal" : "gray.300"} onClick={()=> setPage(true)} borderRadius={"20px"}>
            <MdPayment
              style={{ margin: "auto", marginTop: "15%" }}
              color={page? "teal" : "gray"}
              size="30px"
            />
          </Box>
         
        </HStack>
        <HStack w={{base:"60%",md:"60%",lg:"20%"}} m="auto" justifyContent={"space-between"}  fontWeight={"600"}>
          <Text color="teal.500">Address</Text>
          <Text color={page? "teal.500" : "gray"}>Payment</Text>
        </HStack>
        {page?
        <Stack direction={{base:"column",md:"column",lg:"row"}} w={{base:"95%",md:"90%",lg:"60%"}} m="auto" mt="30px" >
          <VStack   w={{base:"100%",md:"100%",lg:"45%"}}>
            <VStack w="100%" h="150px" bgColor="pink.300" mt="20px" alignItems={"center"}>
                <Text mt="20px" fontSize={"18px"} color="white">Total to pay</Text>
                <Text fontSize={"35px"} fontWeight="bold" color="white">₹{total}</Text>

            </VStack>
            <Box p="20px 0px" w="100%">
               <Text  fontWeight={"600"} color="#999">How would you like to pay?</Text>
               <VStack alignItems={"center"} p="30px 0px" w="100%">
                <HStack border="1px solid #999" p="0px 10px" gap="30px" fontWeight={"600"} h="55px" w="80%" alignItems={"center"}>
                  <Box w="40%">Credit Card</Box>
                  <HStack w="40%" h="60%" alignItems={"center"} >
                    <Box  w="50%" h="100%" border={pay==="visa"? "2px solid teal":""} onClick={()=> setPay("visa")}>
                    <Image src="https://www.learningcog.com/wp-content/uploads/Visa_Logo-600x184.png" h="100%"></Image>
                    </Box>
                    <Box w="50%" h="100%" border={pay==="master"? "3px solid teal":""}  onClick={()=> setPay("master")}>
                    <Image src="https://logos-download.com/wp-content/uploads/2016/03/Mastercard_Logo_1979.png" ></Image>
                    </Box>


                  </HStack>
                </HStack>
                <HStack border="1px solid #999" p="0px 20px" justifyContent={"space-between"} fontWeight={"600"} h="55px" w="80%" alignItems={"center"}>
                <Box>PayPal</Box>
                  <Box color="#999" fontSize={"20px"} fontStyle="italic">PayPal</Box>
                </HStack>
               </VStack>
            </Box>
          </VStack>
          <VStack w={{base:"100%",md:"100%",lg:"55%"}} m="auto" mt="30px" p={{base:"20px 20px",md:"20px 20px",lg:"30px 50px"}} alignItems={"left"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
          <Text textAlign={"left"} fontWeight="600" fontSize={"25px"}>Your Payment Details</Text>
          <FormControl>
          <FormLabel as="legend" fontWeight={600} mt="10px"   >
           Card Holder Name
            </FormLabel>
            <Input type="text" placeholder="Ex:- Abhishek Pal"  border="1px solid teal"/><FormLabel as="legend" fontWeight={600} mt="10px"   >
            Card Number
            </FormLabel>
            <InputGroup>
            <Input max={16} p="0px 20px" placeholder="xxxx xxxx xxxx xxxx"  border="1px solid teal"  type="number" color={cardnum.length<16 &&cardnum.length>0? "red": "green"}  value={cardnum} onChange={(e)=>{
              setCardNum(e.target.value)
             
            }}/>
             <InputRightElement  width='15%'>
              {pay==="visa"? <Box >
                    <Image src="https://www.learningcog.com/wp-content/uploads/Visa_Logo-600x184.png" ></Image>
                    </Box>:<Box>
                    <Image src="https://logos-download.com/wp-content/uploads/2016/03/Mastercard_Logo_1979.png" ></Image>
                    </Box>

}
          </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack w="100%">
              <VStack w="33%" alignItems={"left"}>
                <FormLabel as="legend" fontWeight={600} mt="10px" >
                Exp Mon.
                </FormLabel>

                <Select placeholder="Select Year"  border="1px solid teal">
                  <option value="Assam">JAN</option>
                  <option value="Bihar">FAB</option>
                  <option value="Chenni">MAR</option>
                  <option value="Gujrat">APR</option>
                  <option value="Haryana">MAY</option>
                  <option value="Haryana">JUNE</option>
                  <option value="Haryana">JUL</option>
                  <option value="Haryana">AUG</option>
                  <option value="Haryana">SEP</option>
                  <option value="Haryana">OCT</option>
                  <option value="Haryana">NOV</option>
                  <option value="Haryana">DEC</option>
                </Select>
              </VStack>
              <VStack w="33%" alignItems={"left"}>
                <FormLabel as="legend" fontWeight={600} mt="10px" >
                Exp Year
                </FormLabel>

                <Select placeholder="Select Year"  border="1px solid teal">
                  <option value="Assam">2023</option>
                  <option value="Bihar">2024</option>
                  <option value="Chenni">2025</option>
                  <option value="Gujrat">2026</option>
                  <option value="Haryana">2027</option>
                </Select>
              </VStack>
              <VStack w="33%" alignItems={"left"}>
                <FormLabel as="legend" fontWeight={600} mt="10px" >
                 CVV
                </FormLabel>
                <Input type="text" placeholder="Eg:- 101"  border="1px solid teal"/>
              </VStack>
            </HStack>
            <Button
            alignSelf="left"
            mt="30px"
            p="20px"
            
            bgColor={"pink.400"}
            // type="submit"
            color="white"
            _hover={{color:"pink.500",bgColor:"pink.100"}}
            onClick={()=> handlesubmit()}
            >Pay Now</Button>
        </VStack>
        </Stack>
        : <VStack w={{base:"95%",md:"80%",lg:"30%"}} m="auto" p="20px" mt="30px" borderRadius={"10px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
          
          <FormControl as="fieldset" spacing="24px" >
            <FormLabel as="legend" fontWeight={600}>
              Full Name
            </FormLabel>
            <Input type="name" placeholder="Eg:- Abhishek Pal"  border="1px solid teal"/>
            <FormLabel as="legend" fontWeight={600} mt="10px">
              Email
            </FormLabel>
            <Input type="email" placeholder="Eg:- abhi123@gmail.com" border="1px solid teal"/>
            <FormLabel as="legend" fontWeight={600} mt="10px" >
              Address
            </FormLabel>
            <Input type="text" placeholder="Enter Your Full Address" border="1px solid teal" />
            <FormLabel as="legend" fontWeight={600} mt="10px"   >
              City
            </FormLabel>
            <Input type="text" placeholder="Eg:- Mumbai"  border="1px solid teal"/>
            <HStack w="100%">
              <VStack w="50%" alignItems={"left"}>
                <FormLabel as="legend" fontWeight={600} mt="10px" >
                  State
                </FormLabel>

                <Select placeholder="Select State"  border="1px solid teal">
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chenni">Chenni</option>
                  <option value="Gujrat">Gujrat</option>
                  <option value="Haryana">Haryana</option>
                </Select>
              </VStack>
              <VStack w="50%" alignItems={"left"}>
                <FormLabel as="legend" fontWeight={600} mt="10px" >
                  Zip code
                </FormLabel>
                <Input type="text" placeholder="Eg:- 400009"  border="1px solid teal"/>
              </VStack>
            </HStack>
            <Button
            alignSelf="left"
            mt="30px"
            p="20px"
            bgColor={"pink.600"}
            // type="submit"
            color="white"
            _hover={{color:"pink.500",bgColor:"white"}}
            onClick={()=> setPage(true)}
            >Next</Button>
          </FormControl>
        </VStack>}
        
       
      </Box>
    </>
  );
};

export default PaymentPage;
