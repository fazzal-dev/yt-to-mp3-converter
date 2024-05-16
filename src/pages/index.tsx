import Hero from "../components/Hero";
import { Container } from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import About from "../components/About";
import Faq from "../components/Faq";
import Dguide from "../components/Dguide";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "nav",
        "hero",
        "download_guide",
        "about",
        "features",
        "faq",
      ])),
    },
  };
}

export default Index;
