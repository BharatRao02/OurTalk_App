import { Box, Flex } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      // display={(selectedChat ? "flex" : "none", { md: "flex" })}
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex direction="column" align="center">
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Flex>
    </Box>
  );
};

export default Chatbox;
