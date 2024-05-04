import { useState } from "react";

const useVideoData = (endpoint = "http://162.55.212.83:3001/") => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideoData = async (videoId, customEndpoint = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${endpoint}${customEndpoint}?videoId=${videoId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      const data = await response.json();
      setVideoData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setVideoData(null);
    setLoading(false);
    setError(null);
  };

  return { videoData, loading, error, fetchVideoData, reset };
};

export default useVideoData;
