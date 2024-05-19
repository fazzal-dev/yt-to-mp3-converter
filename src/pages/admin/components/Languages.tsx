import {
  Heading,
  Switch,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [localLanguages, setLocalLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getLanguages = async () => {
    try {
      const response = await axios.get("http://162.55.212.83:3001/languages");
      setLanguages(response.data);
      setLocalLanguages(response.data);
      console.log(languages);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleToggleEnabled = (id) => {
    setLocalLanguages((prevLanguages) =>
      prevLanguages.map((lang) =>
        lang._id === id ? { ...lang, enabled: !lang.enabled } : lang
      )
    );
  };

  const handleSetDefaultLanguage = (id) => {
    setLocalLanguages((prevLanguages) =>
      prevLanguages.map((lang) =>
        lang._id === id
          ? { ...lang, default: true }
          : { ...lang, default: false }
      )
    );
  };

  const applyChanges = async () => {
    setIsLoading(true);
    try {
      for (const lang of localLanguages) {
        await axios.put(`http://162.55.212.83:3001/languages/${lang._id}`, {
          enabled: lang.enabled,
          default: lang.default,
        });
      }
      getLanguages();
      toast({
        title: "Changes Saved Successfully!",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error Saving Changes",
        description: error.message || "An error occurred. Please try again.",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <>
      <TableContainer
        p="10"
        borderRadius="md"
        boxShadow="md"
        bg="gray.50"
        mx="auto"
        maxW="4xl"
      >
        <Heading color="gray.700" mb="6" textAlign="center">
          Languages
        </Heading>
        <Table
          shadow="md"
          w="full"
          size="lg"
          variant="simple"
          bg="white"
          borderRadius="md"
        >
          <Thead>
            <Tr>
              <Th fontWeight="bold" color="gray.600">
                Name
              </Th>
              <Th fontWeight="bold" color="gray.600" textAlign="center">
                Enabled
              </Th>
              <Th fontWeight="bold" color="gray.600" textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {localLanguages.map((lang) => (
              <Tr key={lang._id}>
                <Td color="gray.700">{lang.name}</Td>
                <Td textAlign="center">
                  <Switch
                    isChecked={lang.enabled}
                    onChange={() => handleToggleEnabled(lang._id)}
                    size="md"
                    colorScheme="blue"
                  />
                </Td>
                <Td textAlign="center">
                  <Button
                    onClick={() => handleSetDefaultLanguage(lang._id)}
                    color={lang.default ? "white" : "blue.600"}
                    variant={lang.default ? "solid" : "outline"}
                    colorScheme="blue"
                    size="sm"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    height="32px"
                    aria-required
                  >
                    {lang.default ? "Default" : "Set Default"}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button
          onClick={applyChanges}
          isLoading={isLoading}
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
    </>
  );
};

export default AdminLanguages;
