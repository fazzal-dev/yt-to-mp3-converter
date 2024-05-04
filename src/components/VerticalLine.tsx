import React from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";

const VerticalLine = ({ height }) => {
  const [isMobile] = useMediaQuery("(max-width: 830px)");
  return (
    <Flex display={isMobile ? "none" : "block"}>
      <Box
        position="absolute"
        left="50%"
        top="0"
        bottom="0"
        transform="translateX(-50%)"
        height={height}
        borderLeft={`3px solid rgba(255, 192, 203, 0.6)`}
        zIndex={-1}
        mb={10}
      />
    </Flex>
  );
};

export default VerticalLine;
