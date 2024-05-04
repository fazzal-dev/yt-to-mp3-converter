import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { LuLanguages } from "react-icons/lu";
const Languages = () => {
  return (
    <Box zIndex={99}>
      <Menu>
        <MenuButton as={IconButton} icon={<LuLanguages />} variant="outline" />
        <MenuList>
          <MenuItem>English</MenuItem>
          <MenuItem>Spanish</MenuItem>
          <MenuItem>Mandarin Chinese</MenuItem>
          <MenuItem>French</MenuItem>
          <MenuItem>Arabic</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Languages;
