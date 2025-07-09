import React from "react";
import { Box } from "@mui/material";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

function Layout({ children }) {
  return (
    <Box>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  );
}

export default Layout;
