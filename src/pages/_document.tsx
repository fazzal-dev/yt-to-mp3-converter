import NextDocument, { Html, Head, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript />
          <NextScript />
        </body>
      </Html>
    );
  }
}
