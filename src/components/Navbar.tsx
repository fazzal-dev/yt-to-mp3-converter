import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  IconButton,
  useColorMode,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Languages from "./Languages";

const sections = [
  { title: "Youtube Downloader", link: "#" },
  { title: "Youtube to MP3", link: "#" },
  { title: "Youtube to MP4", link: "#" },
];

const Navbar = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

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
      {/* <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={toggleDrawer}
        display={{ base: "block", md: "none" }}
        position="absolute"
        left="1rem"
        top="1rem"
      /> */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mr={5}
        // ml={{ base: "3rem", md: "0" }}
      >
        YtMp3
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
            {section.title}
          </Button>
        ))}
      </Box>
      <Flex gap={2}>
        <DarkModeSwitch />
        <Languages />
      </Flex>
      {/* <Drawer placement="left" onClose={toggleDrawer} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton m={3} />
            <DrawerHeader>YtMp3</DrawerHeader>
            <DrawerBody>
              {sections.map((section, index) => (
                <Flex flexDirection="column" key={index}>
                  <Button my={2} variant="ghost">
                    {section.title}
                  </Button>
                </Flex>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer> */}
    </Flex>
  );
};

export default Navbar;
