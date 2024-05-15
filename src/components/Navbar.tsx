import { useState } from "react";
import { Flex, Box, Text, useColorMode, Button } from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Languages from "./Languages";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const sections = [
  { id: "Youtube Downloader", link: "#" },
  { id: "Youtube to MP3", link: "#" },
  { id: "Youtube to MP4", link: "#" },
];

const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("nav");

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      as="nav"
      padding="1rem"
      color={colorMode === "dark" ? "white" : "gray.800"}
      justifyContent="space-between"
      alignItems="center"
      w={{ base: "100vw", md: "80vw" }}
    >
      <Text fontSize="2xl" fontWeight="bold" mr={5}>
        {t("logo")}
      </Text>
      <Box
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        justifyContent="center"
      >
        {sections.map((section, index) => (
          <Button
            key={index}
            variant="ghost"
            _hover={{
              color: "red.500",
              cursor: "pointer",
            }}
            mr={4}
          >
            {t(section.id)}
          </Button>
        ))}
      </Box>
      <Flex gap={2}>
        <DarkModeSwitch />
        <Languages />
      </Flex>
    </Flex>
  );
};

export default Navbar;
