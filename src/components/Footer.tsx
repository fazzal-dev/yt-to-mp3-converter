import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Text,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

type FooterWidget = {
  id: string;
  type: "text" | "navigation" | "contact";
  content: string | string[];
};

const footerWidgets: FooterWidget[] = [
  {
    id: "text-widget",
    type: "text",
    content: "YouTube Video to MP3 Converter",
  },
  {
    id: "navigation-widget",
    type: "navigation",
    content: ["Home", "About", "Services", "Contact"],
  },
  {
    id: "contact-widget",
    type: "contact",
    content: ["Email: info@ytmp3.com", "Phone: +1 234-567-890"],
  },
];

const Footer = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "gray.100");

  return (
    <Box
      as="footer"
      bg={bgColor}
      py={{ base: 8, md: 12 }}
      position="absolute"
      bottom="0"
      left="0"
      right="0"
    >
      <Stack
        spacing={{ base: 8, md: 10 }}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
        px={{ base: 4, md: 20 }}
      >
        {footerWidgets &&
          footerWidgets.map((widget) => (
            <Widget key={widget.id} widget={widget} />
          ))}
      </Stack>
      <Divider my={4} borderColor={textColor} />
      <HStack justifyContent="space-between" py={4} px={{ base: 4, md: 8 }}>
        <Text fontSize="sm" color={textColor}>
          © {new Date().getFullYear()} YtMp3. All rights reserved.
        </Text>
        <Link href="#" isExternal>
          <Text fontSize="sm" color={textColor}>
            Privacy Policy
          </Text>
        </Link>
      </HStack>
    </Box>
  );
};

const Widget = ({ widget }) => {
  const { type, content } = widget || {};
  const textColor = useColorModeValue("black", "gray.100");

  switch (type) {
    case "text":
      return (
        <Box maxW="3xl">
          <Link href="#" isExternal>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              YtMp3
            </Text>
          </Link>
          <Text mt={2} color={textColor} fontSize="sm">
            {content}
          </Text>
        </Box>
      );
    case "navigation":
      return (
        <VStack spacing={4} alignItems="flex-start">
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            Navigation
          </Text>
          <VStack spacing={2} alignItems="flex-start" color={textColor}>
            {content &&
              content.map((item) => (
                <Link key={item} href="#" color={textColor}>
                  {item}
                </Link>
              ))}
          </VStack>
        </VStack>
      );
    case "contact":
      return (
        <VStack spacing={4} alignItems="flex-start">
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            Contact
          </Text>
          <VStack spacing={2} alignItems="flex-start" color={textColor}>
            {content && content.map((item) => <Text key={item}>{item}</Text>)}
          </VStack>
        </VStack>
      );
    default:
      return null;
  }
};

export default Footer;
