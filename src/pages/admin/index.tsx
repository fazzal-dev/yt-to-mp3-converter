// src/pages/admin/index.tsx
import AdminLayout from "../../components/AdminLayout";
import Languages from "../../components/LanguageSwitcher";
import withAuth from "../../components/withAuth";
import { ChakraProvider, ColorModeProvider, Heading } from "@chakra-ui/react";
import theme from "../../theme";

const AdminHome = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider
        options={{
          initialColorMode: "dark",
          useSystemColorMode: false,
        }}
      >
        <AdminLayout>
          <Heading as="h1" color="black">
            Welcome to the Admin Panel
          </Heading>
        </AdminLayout>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default withAuth(AdminHome);
