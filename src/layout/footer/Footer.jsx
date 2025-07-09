import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Home,
  Info,
  Favorite,
  Science,
  GitHub,
  LinkedIn,
  Email
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";

function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigationItems = [
    { icon: <Home />, label: "Home", route: ROUTES.root },
    { icon: <Info />, label: "About", route: ROUTES.about },
    { icon: <Favorite />, label: "Favorites", route: ROUTES.favorite },
    { icon: <Science />, label: "Sandbox", route: ROUTES.sandbox },
  ];

  const socialLinks = [
    { icon: <GitHub />, label: "GitHub", url: "https://github.com" },
    { icon: <LinkedIn />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <Email />, label: "Contact", url: "mailto:contact@businesscards.com" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        py: { xs: 1, md: 2 },
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        borderTop: `1px solid ${theme.palette.divider}`,
        zIndex: 1100
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
            gap: { xs: 0, md: 0 }
          }}
        >
          {/* Logo/Brand - Hidden on mobile */}
          <Box sx={{
            textAlign: { xs: 'center', md: 'left' },
            display: { xs: 'none', md: 'block' }
          }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 0.5
              }}
            >
              Business Cards
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
            >
              Connecting businesses worldwide
            </Typography>
          </Box>

          {/* Navigation Icons - Always visible */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 2 },
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {navigationItems.map((item) => (
              <IconButton
                key={item.label}
                onClick={() => navigate(item.route)}
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  size: { xs: 'large', md: 'medium' },
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'action.hover'
                  }
                }}
                aria-label={item.label}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>

          {/* Social Links - Hidden on mobile */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              justifyContent: 'center'
            }}
          >
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-2px)',
                    backgroundColor: 'action.hover'
                  }
                }}
                aria-label={link.label}
              >
                {link.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
