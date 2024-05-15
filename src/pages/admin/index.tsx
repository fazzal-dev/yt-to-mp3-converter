// src/pages/admin/index.tsx
import AdminLayout from "../../components/AdminLayout";
import Languages from "../../components/Languages";
import withAuth from "../../components/WithAuth";
import { Heading } from "@chakra-ui/react";

const AdminHome = () => {
  return (
    <AdminLayout>
      <Heading as="h1" color="black">
        Welcome to the Admin Panel
      </Heading>
    </AdminLayout>
  );
};

export default withAuth(AdminHome);
