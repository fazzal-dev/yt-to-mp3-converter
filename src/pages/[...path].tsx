import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
}) => {
  const pathArray = params.path || [];
  const path = Array.isArray(pathArray)
    ? `/${pathArray.join("/")}`
    : `/${pathArray}`;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["host"];
  const fullUrl = `${protocol}://${host}${path}`;

  // Fetch the redirect data using the full URL
  const apiUrl = `${protocol}://${host}/api/redirect${
    path === "/" ? "" : path
  }`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log("data", data);

  // If a redirect is found, perform the redirect
  if (response.ok && data.toUrl) {
    // Check if the requested path matches the destination URL
    if (
      path === data.toUrl ||
      (path === "/" && data.toUrl.startsWith(`/${data.toUrl.split("/")[1]}`))
    ) {
      // If it matches, render the page directly without redirecting
      let languageCode = "";
      if (path.length > 2) {
        languageCode = path.substring(0, 3);
        console.log(languageCode); // Assuming language code is the first two characters
      }
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
    } else {
      // If it doesn't match, perform the redirect
      return {
        redirect: {
          destination: data.toUrl,
          permanent: false,
        },
      };
    }
  }

  // If the API returns a 404 response, return a 404 page
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }

  // Otherwise, render the page with translations
  let languageCode = "";
  if (path.length > 2) {
    languageCode = path.substring(0, 2); // Assuming language code is the first two characters
  }
  console.log("lang code:", languageCode);
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

export default DynamicPage;
