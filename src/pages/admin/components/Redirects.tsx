import {
  Heading,
  Button,
  TableContainer,
  Input,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Redirects = () => {
  const [fromUrl, setFromUrl] = useState("");
  const [toUrl, setToUrl] = useState("");
  const [path, setPath] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const toast = useToast();

  const handleSaveRedirect = async () => {
    try {
      await axios.post("http://162.55.212.83:3001/redirects", {
        fromUrl,
        toUrl,
        path,
        statusCode: parseInt(statusCode),
      });
      toast({
        title: "Redirect saved successfully!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error saving redirect",
        description: error.message || "An error occurred. Please try again.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <TableContainer
      p="10"
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      mx="auto"
      maxW="4xl"
    >
      <Heading color="black" mb="6" textAlign="center">
        Redirects
      </Heading>
      <Flex
        w="full"
        p={5}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        mb={4}
      >
        <Text mr={3} mb={{ base: 3, md: 0 }} color="black" whiteSpace="nowrap">
          Redirect:
        </Text>
        <Input
          placeholder="Enter redirect URL"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          mb={{ base: 3, md: 0 }}
          borderColor="gray.200"
          flex="1"
          mr={{ base: 0, md: 2 }}
          onChange={(e) => setFromUrl(e.target.value)}
        />
        <Input
          placeholder="/path"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          borderColor="gray.200"
          flex="1"
          onChange={(e) => setPath(e.target.value)}
        />
      </Flex>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text mr={3} mb={{ base: 3, md: 0 }} color="black" whiteSpace="nowrap">
          Redirect To:
        </Text>
        <Input
          placeholder="domain.com"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          mb={{ base: 3, md: 0 }}
          borderColor="gray.200"
          flex="1"
          mr={{ base: 0, md: 2 }}
          onChange={(e) => setToUrl(e.target.value)}
        />
        <Input
          placeholder="Status code"
          bg="white"
          color="black"
          _placeholder={{ color: "gray.500" }}
          borderColor="gray.200"
          flex="1"
          onChange={(e) => setStatusCode(e.target.value)}
        />
      </Flex>
      <Button
        onClick={handleSaveRedirect}
        loadingText="Saving"
        colorScheme="blue"
        variant="solid"
        spinnerPlacement="start"
        color="white"
        mt="6"
        alignSelf="flex-end"
        mr="10"
      >
        Save Changes
      </Button>
    </TableContainer>
  );
};

export default Redirects;
