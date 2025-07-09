import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import React, { createContext, useContext, useState, useEffect } from "react";

//Step1: create the context
const ThemeContext = createContext();

//Step2: create the provider
export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme-mode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme-mode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: isDark ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: isDark ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: isDark ? "#121212" : "#fafafa",
        paper: isDark ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ toggleMode, isDark }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

//step 3 - custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};
