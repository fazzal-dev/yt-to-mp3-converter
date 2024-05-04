import { Flex, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w={{ base: "80vw", md: "50rem" }}
      // mb={1}
      mt={10}
    >
      <Heading m={4} fontSize="4xl" fontWeight="extrabold">
        About Us
      </Heading>
      <Text fontSize="lg">
        iGram Downloader is an easy-to-use, online web tool that allows you to
        download Instagram videos, photos, Reels, and IGTV. With iGram, you can
        download different types of content from Instagram and enjoy them later,
        even when you're offline. So next time you see something on Instagram
        that you want to keep, use iGram Downloader and save it for later!
      </Text>
    </Flex>
  );
};

export default About;
