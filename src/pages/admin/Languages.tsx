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
  Container,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const AdminLanguages = () => {
  const toast = useToast();
  const [languages, setLanguages] = useState([]);
  const [localLanguages, setLocalLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const languagesCollectionRef = collection(db, "languages");

  const getLanguages = async () => {
    const data = await getDocs(languagesCollectionRef);
    const languagesData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLanguages(languagesData);
    setLocalLanguages(languagesData);
  };

  const handleToggleEnabled = (id) => {
    setLocalLanguages((prevLanguages) =>
      prevLanguages.map((lang) =>
        lang.id === id ? { ...lang, enabled: !lang.enabled } : lang
      )
    );
  };

  const handleSetDefaultLanguage = (id) => {
    setLocalLanguages((prevLanguages) =>
      prevLanguages.map((lang) =>
        lang.id === id
          ? { ...lang, default: true }
          : { ...lang, default: false }
      )
    );
  };

  const applyChanges = async () => {
    setIsLoading(true);
    try {
      for (const lang of localLanguages) {
        const languageDoc = doc(db, "languages", lang.id);
        await updateDoc(languageDoc, {
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
      <TableContainer p="10" bg="gray.50" borderRadius="md" boxShadow="md">
        <Heading color="black" mb="6">
          Languages
        </Heading>
        <Table
          shadow="md"
          w="50vw"
          size="lg"
          variant="simple"
          style={{ color: "black", margin: "0 auto" }}
        >
          <Thead textAlign="center">
            <Tr>
              <Th fontWeight="bold">Name</Th>
              <Th fontWeight="bold" textAlign="center">
                Enabled
              </Th>
              <Th fontWeight="bold" textAlign="center">
                Default
              </Th>
              <Th fontWeight="bold" textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {localLanguages.map((lang) => (
              <Tr key={lang.id}>
                <Td>{lang.name}</Td>
                <Td textAlign="center">
                  <Switch
                    isChecked={lang.enabled}
                    onChange={() => handleToggleEnabled(lang.id)}
                    size="md"
                    colorScheme="blue"
                  />
                </Td>
                <Td textAlign="center">{lang.default ? "Yes" : "No"}</Td>
                <Td textAlign="center">
                  <Button
                    onClick={() => handleSetDefaultLanguage(lang.id)}
                    color={lang.default ? "black" : "blue.600"}
                    variant={lang.default ? "solid" : "outline"}
                    colorScheme="blue"
                    size="sm"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    height="32px"
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
          ml="auto"
          mr="10"
        >
          Save Changes
        </Button>
      </TableContainer>
    </>
  );
};

export default AdminLanguages;
