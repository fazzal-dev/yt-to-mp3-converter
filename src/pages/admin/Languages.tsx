import { Heading } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const languages = () => {
  const [languages, setLanguages] = useState([]);
  const languagesCollectionRef = collection(db, "languages");
  useEffect(() => {
    const getLanguages = async () => {
      const data = await getDocs(languagesCollectionRef);
      setLanguages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(languages);
    };

    getLanguages();
  }, []);
  return <Heading color="black">languages</Heading>;
};

export default languages;
