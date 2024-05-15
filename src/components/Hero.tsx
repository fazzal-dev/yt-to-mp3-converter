import {
  Flex,
  Heading,
  Input,
  Box,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import useVideoData from "../hooks/useVideoData";
import VideoDetails from "./VideoDetails";
import SearchResults from "./SearchResults";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");
  const theme = useTheme();
  const gradient = useColorModeValue(
    theme.semanticTokens.gradients.light,
    theme.semanticTokens.gradients.dark
  );
  const toast = useToast();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [videoId, setVideoId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(false);
  };

  function ytVidId(url) {
    var p =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var match = p.exec(url);
    return match ? match[1] : false;
  }

  const handleSearch = async () => {
    if (!searchQuery) {
      toast({
        title: "Empty Input",
        description: "Please enter a search query or a valid Youtube URL",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // Check if the input is a valid URL
    try {
      const url = new URL(searchQuery);
      if (!url.protocol.startsWith("http")) {
        toast({
          title: `${t("invalid_url_title")}`,
          description: `${t("invalid_url_description")}`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const videoId = ytVidId(searchQuery);
      if (videoId) {
        setVideoId(videoId);
        setShowSearchResults(false);
      } else {
        toast({
          title: `${t("invalid_url_title")}`,
          description: `${t("invalid_url_description")}`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setVideoId("");
      setError(null);
      setShowSearchResults(true);
    }
  };
  return (
    <>
      <Box
        w={{ base: "100vw", md: "80vw" }}
        h={{ base: "auto", md: "350px" }}
        pb={20}
        bgGradient={gradient}
        rounded={{ base: "none", md: "xl" }}
        mt={{ base: 0, md: 10 }}
      >
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Flex
            mt="70px"
            color="white"
            textAlign="center"
            px={{ base: 5, md: 0 }}
          >
            <Heading fontSize={{ base: "7vw", md: "4vw" }}>
              {t("title")}
            </Heading>
          </Flex>
          <Text
            pt={5}
            color="white"
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            px={{ base: 5, md: 0 }}
          >
            {t("sub_heading")}
          </Text>
          <Box pt={10}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              px={{ base: 4, md: 0 }}
              position="relative"
            >
              <InputGroup>
                <Input
                  placeholder={t("place_holder")}
                  size="lg"
                  bg={isDark ? "gray.800" : "white"}
                  focusBorderColor={isDark ? "blue.300" : "red.500"}
                  fontSize={{ base: "xs", md: "md" }}
                  width={{ base: "90vw", md: "30rem" }}
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  onChange={handleInputChange}
                  value={searchQuery}
                />
                <InputRightElement
                  display={{ base: "none", md: "flex" }}
                  width="4.6rem"
                  h="100%"
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  right="1"
                  top="50%"
                  transform="translateY(-50%)"
                >
                  <Button
                    borderRadius="0 0.25rem 0.25rem 0"
                    colorScheme="red"
                    size="md"
                    onClick={handleSearch}
                  >
                    {searchQuery.startsWith("http")
                      ? `${t("convert")}`
                      : `${t("search")}`}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                colorScheme="red"
                size="lg"
                mt={{ base: 4, md: 0 }}
                w="100%"
                display={{ base: "flex", md: "none" }}
                onClick={handleSearch}
              >
                {searchQuery.startsWith("http")
                  ? `${t("convert")}`
                  : `${t("search")}`}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {videoId ? (
        <VideoDetails videoId={videoId} />
      ) : showSearchResults ? (
        <SearchResults keyword={searchQuery} />
      ) : null}
    </>
  );
};

export default Hero;
