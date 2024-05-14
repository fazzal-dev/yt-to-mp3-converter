import {
  Card,
  CardBody,
  Image,
  Box,
  Heading,
  Button,
  Progress,
  Text,
  Spinner,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import jwt, { JwtPayload } from "jsonwebtoken";
import Formats from "./Formats";

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
  const [token, setToken] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `http://162.55.212.83:3001/?videoId=${videoId}`
        );
        if (response.status === 500) {
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
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching video data:", error);
        }
      }
    };

    fetchVideoData();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [videoId, toast]);

  useEffect(() => {
    setLoading(true);
    setVideoData(null);
    setIsComplete(false);
  }, [videoId]);

  useEffect(() => {
    socketRef.current = io("http://162.55.212.83:3002");

    socketRef.current.on("secretkey", (k) => {
      setKey(k);
    });

    socketRef.current.on("progress", (data) => {
      setProgress(data);
    });

    socketRef.current.on("finish", (tok) => {
      const payload = jwt.verify(tok, key) as JwtPayload;
      const token = extractJwtFromUrl(payload.url);
      setToken(token);
      setUrl(payload.url);
      setIsComplete(true);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [key]);

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

  function extractJwtFromUrl(url) {
    const parts = url.split("/");
    const token = parts[parts.length - 1];
    return token;
  }

  const handleConvert = async () => {
    if (!selectedFormat) {
      toast({
        title: "No Format Selected",
        description: "Please select a format before converting.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const token = generateJWT(videoId);
    if (selectedFormat === "mp3") {
      socketRef.current.emit("downloadMp3", token);
    } else if (selectedFormat === "mp4") {
      socketRef.current.emit("downloadMp4", token);
    }
  };

  const handleDownload = async () => {
    if (url) {
      try {
        const downloadUrl = `http://162.55.212.83:3001/download/${token}?format=${selectedFormat}`;
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
        >
          <Image
            w="auto"
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt="Video Thumbnail"
          />

          <CardBody w={{ base: "80vw", md: "30vw" }}>
            <Heading size="md" noOfLines={2} textOverflow="ellipsis">
              {data.title}
            </Heading>
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
