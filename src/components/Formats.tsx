import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

const Formats = ({ onSelect }) => {
  const [selectedFormat, setSelectedFormat] = useState("Format");

  const handleChange = (format) => {
    setSelectedFormat(format);
    onSelect(format);
  };

  return (
    <Flex mt={4} flexDir="row">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedFormat.toUpperCase()}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleChange("mp3")}>MP3</MenuItem>
          <MenuItem onClick={() => handleChange("mp4")}>MP4</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Formats;
