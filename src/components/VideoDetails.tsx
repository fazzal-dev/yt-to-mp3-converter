import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Button,
  Box,
  Progress,
  Text,
  Spinner,
  Flex,
  Container,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import jwt, { JwtPayload } from "jsonwebtoken";
import Formats from "./Formats";
import { title } from "process";

const VideoDetails = ({ videoId }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setVideoData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");
  const abortController = useRef(new AbortController());
  console.log(selectedFormat);

  const socket = io("http://162.55.212.83:3002");

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `http://162.55.212.83:3001/?videoId=${videoId}`
        );
        if (response.status == 500) {
          setIsAvailable(false);
          setVideoData(null);
          setLoading(false);
          toast({
            title: "Invalid YouTube URL",
            description: "Please enter a valid YouTube URL with a video ID",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          return;
        }
        setIsAvailable(true);
        const videoData = await response.json();
        setVideoData(videoData);
        console.log(videoData);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching video data:", error);
        }
      }
    };

    fetchVideoData();

    return () => {
      abortController.current.abort();
      socket.disconnect();
    };
  }, [videoId]);

  useEffect(() => {
    setLoading(true);
    setVideoData(null);
    setIsComplete(false);
  }, [videoId]);

  socket.on("secretkey", (k) => {
    setKey(k);
  });

  const generateJWT = (videoId) => {
    if (!key) {
      console.error("Key is missing. Unable to generate JWT.");
      return null;
    }
    const payload = {
      id: videoId,
      title: data.title,
    };
    const token = jwt.sign(payload, key, { expiresIn: "1h" });
    return token;
  };

  const handleConvert = async () => {
    if (selectedFormat == "mp3") {
      const token = generateJWT(videoId);
      socket.emit("downloadMp3", token);
      socket.on("progress", (data) => {
        setProgress(data);
      });
      socket.on("finish", (token) => {
        const payload = jwt.verify(token, "password") as JwtPayload;
        setUrl(payload.url);
        setIsComplete(true);
      });
    } else if (selectedFormat == "mp4") {
      console.log("downloading mp4");
      fetch(`http://162.55.212.83:3001/mp4?videoId=${videoId}`).then(() => {
        setIsComplete(true);
      });
      socket.on("progress", (data) => {
        setProgress(data);
      });
    } else {
      toast({
        title: "No Format Selected",
        description: "Please select a format before converting.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // const handleDownload = async () => {
  //   if (url) {
  //     try {
  //       const downloadUrl = url;
  //       const anchorElement = document.createElement("a");
  //       anchorElement.href = downloadUrl;
  //       document.body.appendChild(anchorElement);
  //       anchorElement.click();
  //       document.body.removeChild(anchorElement);
  //     } catch (error) {
  //       if (error.name !== "AbortError") {
  //         console.error("Error downloading video:", error);
  //       }
  //     }
  //   } else {
  //     if (!videoBlob) {
  //       console.error("No audio to save");
  //       return;
  //     }
  //     const url = `http://162.55.212.83:3001/mp4?videoId=${videoId}`;
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "audio.mp3");
  //     document.body.appendChild(link);
  //     link.click();
  //   }
  // };

  const handleDownload = async () => {
    if (url) {
      try {
        console.log(selectedFormat);
        const downloadUrl = `http://162.55.212.83:3001/download/${generateJWT(
          videoId
        )}?format=${selectedFormat}`;
        const anchorElement = document.createElement("a");
        anchorElement.href = downloadUrl;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        setIsComplete(false);
        setProgress(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error downloading video:", error);
          setIsComplete(false);
          setProgress(null);
        }
      }
    } else {
      try {
        console.log(selectedFormat);
        let downloadUrl = `http://162.55.212.83:3001/download/${generateJWT(
          videoId
        )}?format=${selectedFormat}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `video.${selectedFormat}`);
        document.body.appendChild(link);
        link.click();
        setIsComplete(false);
        // setProgress(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error downloading video:", error);
          setIsComplete(false);
          setProgress(null);
        }
      }
    }
  };

  if (loading)
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

  return (
    <>
      {isAvailable && (
        <Card
          direction={{ base: "column", sm: "row" }}
          variant="outline"
          mt={5}
          w={{ base: "100%", md: "50%" }}
        >
          <Box>
            <Image
              w={{ base: "100%", md: "auto" }}
              h={{ base: "auto", md: "100%" }}
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt="Video Thumbnail"
            />
          </Box>

          <CardBody>
            <Heading size="md">{data.title}</Heading>
            <Formats onSelect={setSelectedFormat} />
            <Flex mt={4}>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={handleConvert}
              >
                Convert
              </Button>
              {isComplete && (
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={handleDownload}
                  ml={4}
                >
                  Download
                </Button>
              )}
            </Flex>
            {progress !== null && progress < 100 && (
              <Box mt={3}>
                <Text fontSize="md">Converting: {Math.round(progress)}%</Text>
                <Progress mt={4} value={progress} hasStripe />
              </Box>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default VideoDetails;
