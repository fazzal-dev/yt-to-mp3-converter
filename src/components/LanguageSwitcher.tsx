import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Flag from "react-world-flags";
import axios from "axios";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const router = useRouter();
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          "http://162.55.212.83:3001/languages",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const enabledLanguages = response.data.filter((lang) => lang.enabled);
        setLanguages(enabledLanguages);

        const defaultLang = enabledLanguages.find((lang) => lang.default);
        // if (defaultLang && i18n.language !== defaultLang.code) {
        //   router.push("/", "/", { locale: defaultLang.code });
        // }
      } catch (error) {
        console.error("Error fetching languages:", error);
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
