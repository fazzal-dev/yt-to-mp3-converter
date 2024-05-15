// components/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/config";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      });
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
