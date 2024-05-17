import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { LuLanguages } from "react-icons/lu";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Flag from "react-world-flags";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const languages = [
  { code: "en", name: "English", flag: "GB" },
  { code: "de", name: "German", flag: "DE" },
  { code: "es", name: "Spanish", flag: "ES" },
  { code: "id", name: "Indonesian", flag: "ID" },
  { code: "ar", name: "Arabic", flag: "SA" },
  { code: "it", name: "Italian", flag: "IT" },
  { code: "hi", name: "Hindi", flag: "IN" },
  { code: "pl", name: "Polish", flag: "PL" },
  { code: "fr", name: "French", flag: "FR" },
];

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchLanguages = async () => {
      const languagesCollectionRef = collection(db, "languages");
      const data = await getDocs(languagesCollectionRef);
      const enabledLanguages = data.docs
        .map((doc) => doc.data())
        .filter((lang) => lang.enabled);
      setLanguages(enabledLanguages);
      const defaultLang = enabledLanguages.find((lang) => lang.default);
      if (defaultLang && i18n.language !== defaultLang.code) {
        changeLanguage(defaultLang.code);
      }
    };

    fetchLanguages();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      router.push(router.pathname, router.asPath, { locale: lng });
    });
  };

  const selectedLanguage = languages.find(
    (lang) => lang.code === i18n.language
  );

  return (
    <Box zIndex={99}>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<Flag code={selectedLanguage?.flag} width="30" />}
          variant="outline"
        />
        <MenuList>
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
            >
              <Flag
                code={language.flag}
                alt={language.name}
                style={{ width: "20px", marginRight: "8px" }}
              />
              {language.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Languages;
