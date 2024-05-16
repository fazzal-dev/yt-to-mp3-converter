import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Flex,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface FaqType {
  question: string;
  answer: string;
}

// const faqs = [
//   {
//     question: "Is it legal to convert YouTube videos to MP3?",
//     answer:
//       "It is generally legal to convert YouTube videos to MP3 for personal use. However, distributing the MP3 files or using them for commercial purposes may violate copyright laws.",
//   },
//   {
//     question:
//       "Do I need to install any software to convert YouTube videos to MP3?",
//     answer:
//       "No, there are many online tools available that allow you to convert YouTube videos to MP3 without the need for any software installation.",
//   },
//   {
//     question: "Can I convert YouTube videos to MP3 on my mobile phone?",
//     answer:
//       "Yes, there are several apps available for both Android and iOS that allow you to convert YouTube videos to MP3 directly on your mobile device.",
//   },
//   {
//     question:
//       "Are there any limitations on the length of the YouTube video I can convert to MP3?",
//     answer:
//       "The length of the YouTube video you can convert to MP3 may vary depending on the tool or service you are using. Some tools may have limitations on the length of the video that can be converted.",
//   },
//   {
//     question: "Can I convert YouTube videos to MP3 in high quality?",
//     answer:
//       "Yes, many YouTube to MP3 converters offer options to convert videos in high quality, such as 320kbps, which is considered near CD quality.",
//   },
// ];

const Faq = () => {
  const { t } = useTranslation("faq");
  const faqs = t("faq.faqs", { returnObjects: true }) as FaqType[];
  return (
    <Box
      w={{ base: "80vw", md: "750px" }}
      mt={20}
      mb={{ base: "1vh", md: 0 }}
      pb={{ base: "40rem", md: "400px" }}
    >
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Heading fontWeight="extrabold" mb={4} textAlign="center">
          {t("faq.header")}
        </Heading>
        <Text mb={4}>{t("faq.sub_heading")}</Text>
      </Flex>
      {faqs.map((faq, index) => (
        <Question key={index} question={faq.question} answer={faq.answer} />
      ))}
    </Box>
  );
};

const Question = ({ question, answer }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Accordion allowToggle>
      <AccordionItem w={{ base: "100%", md: "100%" }}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {question}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel color={isDark ? "gray.200" : "gray.800"} pb={4}>
          {answer}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Faq;
