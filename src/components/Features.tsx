import {
  Text,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface FeatureTypes {
  title: string;
  description: string;
}

// const features = [
//   {
//     title: "Fast Conversion",
//     image: "images/paste-url.png",
//     description:
//       "Instantly convert YouTube videos to MP3 format without any delay, allowing users to download their favorite music quickly and efficiently.",
//   },
//   {
//     title: "High-Quality Audio",
//     image: "images/paste-url.png",
//     description:
//       " Ensure that the converted MP3 files retain the original audio quality of the YouTube videos, providing users with a premium listening experience.",
//   },
//   {
//     title: "Bulk Conversion",
//     image: "images/paste-url.png",
//     description:
//       " Enable users to convert multiple YouTube videos to MP3 at once, saving time and effort for those looking to download entire playlists or albums.",
//   },
//   {
//     title: "Customizable Bitrate",
//     image: "images/paste-url.png",
//     description:
//       "Offer users the option to select the bitrate of the converted MP3 files, allowing them to choose between smaller file sizes for convenience or higher quality for better audio.",
//   },
//   {
//     title: "Cross-Platform Compatibility",
//     image: "images/paste-url.png",
//     description:
//       " Provide a web-based converter that works seamlessly on all devices and platforms, including desktops, laptops, tablets, and smartphones.",
//   },
//   {
//     title: "User-Friendly Interface",
//     image: "images/paste-url.png",
//     description:
//       "Design an intuitive and easy-to-use interface that guides users paste-url process step-by-step, ensuring a smooth and hassle-free experience.",
//   },
// ];

const imagePaths = [
  { image: "images/paste-url.png" },
  { image: "images/paste-url.png" },
  { image: "images/paste-url.png" },
  { image: "images/paste-url.png" },
  { image: "images/paste-url.png" },
  { image: "images/paste-url.png" },
];

const Features = () => {
  const { t } = useTranslation("features");
  const features = t("feature.features", {
    returnObjects: true,
  }) as FeatureTypes[];
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text
        fontSize={{ base: "4vh", md: "3xl" }}
        fontWeight="extrabold"
        textAlign="center"
        mt={10}
        pb={7}
      >
        {t("feature.header")}
      </Text>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={5}
      >
        {features.map((feature, index) => (
          <GridItem colSpan={1} key={index}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              imgSrc={imagePaths[index].image}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Features;

const FeatureCard = ({ title, description, imgSrc }) => {
  return (
    <>
      <Card w={{ base: "80vw", md: "250px" }} h={{ base: "auto", md: "auto" }}>
        <CardBody>
          <Flex alignItems="center" justifyContent="center">
            <Image src={imgSrc} alt={title} borderRadius="lg" w="450px" />
          </Flex>
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text fontSize="md">{description}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
