// components/AdminLayout.js
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  background,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  LuAppWindow,
  LuCookie,
  LuLanguages,
  LuSlidersHorizontal,
} from "react-icons/lu";
import {
  BsBoxArrowUpRight,
  BsFiletypeHtml,
  BsFiletypeXml,
  BsRobot,
  BsWindowDesktop,
} from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiAdvertisementLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import Languages from "../pages/admin/Languages";

const menuItems = [
  { label: "Languages", link: "/admin/languages", icon: <LuLanguages /> },
  { label: "Audio/Video", link: "/admin/meta", icon: <LuSlidersHorizontal /> },
  { label: "Header", link: "/admin/language", icon: <LuAppWindow /> },
  { label: "Footer", link: "/admin/redirects", icon: <BsWindowDesktop /> },
  { label: "Cookie", link: "/admin/redirects", icon: <LuCookie /> },
  { label: "Redirects", link: "/admin/redirects", icon: <BsBoxArrowUpRight /> },
  { label: "Upload", link: "/admin/redirects", icon: <IoCloudUploadOutline /> },
  {
    label: "Advertisement",
    link: "/admin/redirects",
    icon: <RiAdvertisementLine />,
  },
  { label: "Pages", link: "/admin/redirects", icon: <BsFiletypeHtml /> },
  { label: "Sitemap", link: "/admin/redirects", icon: <BsFiletypeXml /> },
  { label: "Robots.txt", link: "/admin/redirects", icon: <BsRobot /> },
];

const AdminLayout = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    router.push(menuItem.link);
  };

  return (
    <Flex minH="100vh" bg="gray.100">
      <Box w="250px" bg="gray.800" color="" p={4}>
        <Heading size="md" mb={4}>
          Admin Panel
        </Heading>
        <Stack spacing={4}>
          {menuItems.map((menuItem, index) => (
            <NextLink key={index} href={menuItem.link} passHref>
              <Button
                as="a"
                w="100%"
                leftIcon={menuItem.icon}
                variant="ghost"
                colorScheme="blue"
                justifyContent="start"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(menuItem.label);
                }}
                style={
                  menuItem.label === activeMenuItem
                    ? { backgroundColor: "#3182ce", color: "white" }
                    : {}
                }
              >
                {menuItem.label}
              </Button>
            </NextLink>
          ))}
          <Button
            w="100%"
            leftIcon={<FaSignOutAlt />}
            variant="solid"
            colorScheme="red"
            justifyContent="start"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Stack>
      </Box>
      <Box flex="1" boxShadow="lg">
        <Box p={4}>{activeMenuItem === "Languages" && <Languages />}</Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
