import { Flex, Box, Text, Image, Heading } from "@chakra-ui/react";

const GuideStep = ({ step, imageSrc, description }) => (
  <Flex
    direction={{ base: "column", md: step % 2 === 0 ? "row-reverse" : "row" }}
    align="center"
    justify="space-between"
    my={{ base: 7, md: 14 }}
    mx={{ base: 0, md: 7 }}
  >
    <Box
      flex="1"
      mr={{ base: 0, md: step % 2 === 0 ? 6 : 0 }}
      mb={{ base: 2, md: 0 }}
      mt={{ base: 0, md: step % 2 === 0 ? 0 : 2 }}
      textAlign={{ base: "center", md: "left" }}
      p={{ base: 0, md: 7 }}
    >
      <Text fontSize="3xl" fontWeight="bold">
        Step {step}
      </Text>
      <Text fontSize="lg" width={{ base: "100%", md: "60%" }}>
        {description}
      </Text>
    </Box>
    <Box flex="1" ml={{ base: 0, md: step % 2 === 0 ? 0 : 6 }}>
      <Image
        src={imageSrc}
        alt={`Step ${step}`}
        objectFit="cover"
        rounded={6}
        boxShadow="2xl"
      />
    </Box>
  </Flex>
);

const Guide = () => {
  return (
    <Flex direction="column" align="center" pb="24rem">
      <Heading fontSize={{ base: "6vw", md: "4xl" }} mt="vh" textAlign="center">
        Step by Step Guide: How to Download Youtube Videos
      </Heading>
      <GuideStep
        step={1}
        imageSrc="/images/guide-step-1.png"
        description="Copy the link to the YouTube video you want to convert, and paste it to the converter tool."
      />
      <GuideStep
        step={2}
        imageSrc="/images/guide-step-2.png"
        description='Click the "Convert" button, then wait a few moments for the tool to work its magic.'
      />
      <GuideStep
        step={3}
        imageSrc="/images/guide-step-3.png"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco "
      />
    </Flex>
  );
};

export default Guide;
