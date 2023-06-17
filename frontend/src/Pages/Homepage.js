import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history("/chats");
  }, [history]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Container maxW="xl" centerContent>
        <Box
          p={2}
          bg="white"
          w="100%"
          m="45px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Flex justify="center" as="b">
            <Text fontSize="4xl" fontFamily="Work sans">
              OurTalk App
            </Text>
          </Flex>
        </Box>
        <Box bg="white" w="100%" p={3} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="10px">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          as="footer"
          backgroundColor="gray.800"
          color="white"
          py={2}
          position="absolute"
          bottom={0}
          left={0}
          width="100%"
          textAlign="center"
        >
          <Flex justifyContent="center" alignItems="center">
            <Box>
              <Text>&copy; 2023 Your Website. All rights reserved.</Text>
              <Text>
                Designed & Maintained by{" "}
                <Text as="span" color="gray.400" fontWeight="bold">
                  Bharat Rao
                </Text>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

export default Homepage;
