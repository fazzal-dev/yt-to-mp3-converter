import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { LuLanguages } from "react-icons/lu";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "id", name: "Indonesian" },
  { code: "ar", name: "Arabic" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "pl", name: "Polish" },
  { code: "fr", name: "French" },
];

const Languages = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      router.push(router.pathname, router.asPath, { locale: lng });
    });
  };

  return (
    <Box zIndex={99}>
      <Menu>
        <MenuButton as={IconButton} icon={<LuLanguages />} variant="outline" />
        <MenuList>
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
            >
              {language.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Languages;
