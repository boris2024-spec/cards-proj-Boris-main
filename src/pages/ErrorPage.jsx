import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme
} from "@mui/material";
import {
  ErrorOutline,
  Home,
  ArrowBack
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesDict";

function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            border: `1px solid ${theme.palette.divider}`,
            maxWidth: 500,
            width: '100%'
          }}
        >
          {/* Error Icon */}
          <Box sx={{ mb: 3 }}>
            <ErrorOutline
              sx={{
                fontSize: { xs: 80, md: 120 },
                color: theme.palette.error.main,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}
            />
          </Box>

          {/* Error Code */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 'bold',
              color: theme.palette.error.main,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1
            }}
          >
            404
          </Typography>

          {/* Error Message */}
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', md: '1.1rem' },
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            Oops! The page you're looking for doesn't exist.
            It might have been moved, deleted, or you entered the wrong URL.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => navigate(ROUTES.root)}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go Home
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go Back
            </Button>
          </Box>
        </Paper>

        {/* Additional Help Text */}
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: theme.palette.text.secondary,
            textAlign: 'center'
          }}
        >
          If you think this is a mistake, please contact support or try again later.
        </Typography>
      </Box>
    </Container>
  );
}

export default ErrorPage;
