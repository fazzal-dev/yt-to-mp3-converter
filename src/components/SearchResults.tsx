import { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Button,
} from "@chakra-ui/react";
import useVideoData from "../hooks/useVideoData";
import VideoDetails from "./VideoDetails";

const SearchResults = ({ keyword }) => {
  const { error } = useVideoData();

  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const prevKeywordRef = useRef(keyword);

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      const response = await fetch(
        `http://162.55.212.83:3001/search?keyword=${keyword}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      const data = await response.json();
      setSearchData(data);
      setLoading(false);
    };
    handleSearch();
    if (keyword !== prevKeywordRef.current) {
      //   prevKeywordRef.current = keyword;
      handleSearch();
    }
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!searchData) {
    return null;
  }

  return (
    <>
      {showGrid && (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={2}
          mt={4}
        >
          {searchData.videos.map((video) => (
            <GridItem key={video.videoId}>
              <SearchResultCard
                title={video.title}
                imgSrc={video.thumbnail}
                onDownload={() => {
                  setSelectedVideoId(video.videoId);
                  setShowGrid(false);
                }}
              />
            </GridItem>
          ))}
        </Grid>
      )}
      {selectedVideoId && <VideoDetails videoId={selectedVideoId} />}
    </>
  );
};

const SearchResultCard = ({ title, imgSrc, onDownload }) => {
  return (
    <>
      <Card w={{ base: "80vw", md: "300px" }} h={{ base: "auto", md: "290px" }}>
        <CardBody>
          <Flex alignItems="center" justifyContent="center">
            <Image src={imgSrc} alt={title} borderRadius="lg" w="450px" />
          </Flex>
          <Stack mt="6" spacing="3">
            <Text
              fontSize="md"
              noOfLines={1}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {title}
            </Text>
          </Stack>
          <Button variant="solid" mt={2} onClick={onDownload}>
            Download
          </Button>
        </CardBody>
      </Card>
    </>
  );
};
export default SearchResults;
