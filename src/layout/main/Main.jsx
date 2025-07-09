import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function Main({ children, sx, ...props }) {
  const { isDark } = useTheme();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: isDark ? "grey.900" : "grey.50",
        minHeight: "80vh",
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        pb: { xs: 8, md: 10 }, // Padding bottom for fixed footer
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
