import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DownloadGuide from "../components/Dguide";
import About from "../components/About";
import Features from "../components/Features";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

const DynamicPage = () => {
  return (
    <>
      <Container px={{ base: 5, md: 0 }} height="100%">
        <Navbar />
        <Hero />
        <DownloadGuide />
        <About />
        <Features />
        <Faq />
      </Container>
      <Footer />
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { path } = params || {};
  console.log(path);
  let languageCode = "";
  let slug = "";

  if (path && path.length > 2) {
    languageCode = path.substring(0, 2);
    slug = path.substring(2);
  } else if (path) {
    languageCode = path;
  }
  console.log(languageCode);
  console.log(slug);
  return {
    props: {
      ...(await serverSideTranslations(languageCode, [
        "nav",
        "hero",
        "download_guide",
        "about",
        "features",
        "faq",
      ])),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { path: "es1" } },
    { params: { path: "en1" } },
    // Add more paths if needed
  ];

  return {
    paths,
    fallback: true,
  };
};

export default DynamicPage;
