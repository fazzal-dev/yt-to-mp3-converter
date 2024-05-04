import Hero from "../components/Hero";
import { Container } from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DownloadGuide from "../components/DownloadGuide";
import Features from "../components/Features";
import About from "../components/About";
import Faq from "../components/Faq";
import Dguide from "../components/Dguide";
import useVideoData from "../hooks/useVideoData";
import { useEffect } from "react";
import VideoDetails from "../components/VideoDetails";

const Index = () => {
  return (
    <>
      <Container px={{ base: 5, md: 0 }} height="100%">
        <Navbar />
        <Hero />
        <Dguide />
        <About />
        <Features />
        <Faq />
      </Container>
      <Footer />
    </>
  );
};

export default Index;
