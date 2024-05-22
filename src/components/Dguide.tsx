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
import { useTranslation } from "next-i18next";

interface Step {
  title: string;
  description: string;
}

// const steps = [
//   {
//     title: "Copy the URL",
//     image: "images/copy-url.png",
//     description:
//       "To get started, access either the Instagram app or website and retrieve the link to the specific video, reels, carousel, or IGTV content that you want to copy.",
//   },
//   {
//     title: "Paste the link",
//     image: "images/paste-url.png",
//     description:
//       "Return to the Igram website, paste the link into the input field at the top of the screen and click the “Download” button.",
//   },
//   {
//     title: "Download",
//     image: "images/click-download.png",
//     description:
//       "In no time at all, you'll receive a list of results that offer various quality options. Choose the option that best suits your requirements and download it.",
//   },
// ];
const imagePaths = [
  { image: "images/copy-url.png" },
  {
    image: "images/paste-url.png",
  },
  { image: "images/click-download.png" },
];

const DownloadGuide = () => {
  const theme = useTheme();
  const gradient = useColorModeValue(
    theme.semanticTokens.gradients.light,
    theme.semanticTokens.gradients.dark
  );
  const { t } = useTranslation("download_guide");
  const steps = t("downloadGuide.steps", {
    returnObjects: true,
  }) as Step[];

  return (
    <Flex alignItems="center" direction="column">
      <Text
        textAlign="center"
        fontWeight="extrabold"
        fontSize={{ base: "4vh", md: "4xl" }}
        mt={14}
        pb={7}
      >
        {t("downloadGuide.header")}
      </Text>
      <VStack spacing={8} width="100%" maxWidth="800px">
        {steps.map((step, index) => (
          <Flex
            key={index}
            direction={{
              base: "column",
              md: "row",
            }}
            alignItems="center"
            position="relative"
            textAlign={{ base: "center", md: "left" }}
            padding={{ base: "10px", md: "0px" }}
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
                textAlign="center"
                position={{ base: "static", md: "absolute" }}
                left="48%"
                top={{ base: "10%", md: "3%" }}
              >
                {index + 1}
                {index === steps.length - 1 ? (
                  <VerticalLine height="150px" />
                ) : (
                  <VerticalLine height="240px" />
                )}
              </Box>
            </Flex>
            <Box
              mt={{ base: "10px", md: "-7vh" }}
              ml={{ base: "0", md: index % 2 === 0 ? "10vw" : "0vw" }}
              mr={{ base: "0", md: index % 2 === 0 ? "-1vw" : "10vw" }}
              order={{ base: "1", md: index % 2 === 0 ? "2" : "1" }}
              textAlign={{ base: "center", md: "left" }}
              flex="1"
              w={{ base: "auto", md: 0 }}
            >
              <Text fontWeight="bold" fontSize="xl">
                {step.title}
              </Text>
              <Text>{step.description}</Text>
            </Box>
            <Box
              mt={{ base: "20px", md: "0" }}
              order={{ base: "0", md: index % 2 === 0 ? "1" : "2" }}
              display={{ base: "block", md: "block" }}
              flex="1"
              w={{ base: "50vw", md: "30vw" }}
            >
              <Image
                src={imagePaths[index].image}
                alt={`Step ${index + 1}`}
                w="320px"
              />
            </Box>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default DownloadGuide;
