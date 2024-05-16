import { Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface aboutType {
  title: string;
  description: string;
}

const About = () => {
  const { t } = useTranslation("about");
  const about = t("about", { returnObjects: true }) as aboutType;
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w={{ base: "80vw", md: "50rem" }}
      mt={10}
    >
      <Heading m={4} fontSize="4xl" fontWeight="extrabold">
        {about.title}
      </Heading>
      <Text fontSize="lg">{about.description}</Text>
    </Flex>
  );
};

export default About;
