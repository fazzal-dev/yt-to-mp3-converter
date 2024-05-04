import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";
import VerticalLine from "./VerticalLine";

const steps = [
  {
    title: "Copy the URL",
    image: "images/copy-url.png",
    description:
      "To get started, access either the Instagram app or website and retrieve the link to the specific video, reels, carousel, or IGTV content that you want to copy.",
  },
  {
    title: "Paste the link",
    image: "images/paste-url.png",
    description:
      "Return to the Igram website, paste the link into the input field at the top of the screen and click the “Download” button.",
  },
  {
    title: "Download",
    image: "images/click-download.png",
    description:
      "In no time at all, you'll receive a list of results that offer various quality options. Choose the option that best suits your requirements and download it.",
  },
];

const DownloadGuide = () => {
  const theme = useTheme();
  const gradient = useColorModeValue(
    theme.semanticTokens.gradients.light,
    theme.semanticTokens.gradients.dark
  );
  return (
    <Flex
      direction="column"
      w={{ base: "100%", md: "100%" }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Text
        fontSize={{ base: "4vh", md: "4xl" }}
        fontWeight="extrabold"
        textAlign="center"
        mt={14}
        pb={7}
      >
        How to Download Youtube Videos?
      </Text>
      <VStack>
        {steps.map((step, index) => (
          <Flex
            key={index}
            justifyContent="center"
            position="relative"
            gap={{ base: "5vw" }}
            direction={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
            m={{ base: 3, md: 1 }}
            p={{ base: 3, md: 1 }}
            mt={7}
          >
            <Flex zIndex={99999}>
              <Box
                borderRadius="full"
                color="white"
                bgGradient={gradient}
                bgColor="white"
                fontSize="sm"
                fontWeight="bold"
                h="35px"
                w="35px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                left="50%"
                top={{ base: "-15%", md: "5%" }}
                mt={{ base: 4, md: 0 }}
              >
                {index + 1}

                {index === steps.length - 1 ? (
                  <VerticalLine height="25vh" />
                ) : (
                  <VerticalLine height="35vh" />
                )}
              </Box>
            </Flex>
            <Box
              w={{ base: "100%", md: "60vh" }}
              order={{ base: "1", md: index % 2 === 0 ? "3" : "1" }}
              pl={{ base: 0, md: index % 3 === 1 ? "20px" : "0vw" }}
              pr={{ base: 0, md: index % 3 === 1 ? "4vw" : "4vw" }}
              mt={{ base: 3, md: index % 3 === 1 ? "0vw" : "-1vh" }}
            >
              <Text fontWeight="bold" fontSize="xl">
                {step.title}
              </Text>
              <Text mt="2">{step.description}</Text>
            </Box>
            <Box
              order={{ base: "0", md: index % 2 === 0 ? "2" : "1" }}
              w={{ base: "100%", md: "30vw" }}
              mt={{ base: 0, md: -1 }}
            >
              <Image
                src={step.image}
                alt={`Step ${index + 1}`}
                w="350px"
                pl={{ base: 0, md: index % 3 === 1 ? "25px" : "15px" }}
              />
            </Box>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default DownloadGuide;
