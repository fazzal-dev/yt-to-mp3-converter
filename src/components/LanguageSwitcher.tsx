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

        if (!localStorage.getItem("userLanguage")) {
          const defaultLang = enabledLanguages.find((lang) => lang.default);

          if (defaultLang) {
            const defaultRedirectResponse = await axios.get(
              `${window.location.origin}/api/default-redirect`
            );

            if (
              defaultRedirectResponse.status === 200 &&
              defaultRedirectResponse.data.defaultToUrl
            ) {
              router.push(
                defaultRedirectResponse.data.defaultToUrl,
                defaultRedirectResponse.data.defaultToUrl,
                {
                  locale: defaultLang.code,
                }
              );
              localStorage.setItem("userLanguage", defaultLang.code);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  const changeLanguage = async (lng) => {
    const currentPath = router.asPath.split("/").slice(2).join("/"); // Remove locale prefix
    const apiUrl = `${window.location.origin}/api/redirect/${lng}${
      currentPath ? `/${currentPath}` : ""
    }`;

    try {
      const redirectResponse = await axios.get(apiUrl);
      let newPath = `/${lng}`;

      if (redirectResponse.status === 200 && redirectResponse.data.toUrl) {
        newPath = redirectResponse.data.toUrl;
      }

      i18n.changeLanguage(lng).then(() => {
        localStorage.setItem("userLanguage", lng);
        router.push(newPath, newPath, { locale: lng });
      });
    } catch (error) {
      console.error("Error fetching redirect path:", error);
      i18n.changeLanguage(lng).then(() => {
        localStorage.setItem("userLanguage", lng);
        const newFullPath = `/${lng}${currentPath ? `/${currentPath}` : ""}`;
        router.push(newFullPath, newFullPath, { locale: lng });
      });
    }
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
