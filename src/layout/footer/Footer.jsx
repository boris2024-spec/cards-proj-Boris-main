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
  GitHub,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Badge as BadgeIcon
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import ROUTES from "../../routes/routesDict";
import { useCurrentUser } from "../../users/providers/UserProvider"; // added

function Footer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:1080px)');
  const { user } = useCurrentUser(); // get user
  const isBiz = Boolean(user?.isBusiness ?? user?.biz ?? false); // business flag

  const navigationItems = [
    { icon: <Home />, label: "Home", route: ROUTES.root },
    { icon: <Info />, label: "About", route: ROUTES.about },
    { icon: <Favorite />, label: "Favorites", route: ROUTES.favorite },
    { icon: <BadgeIcon />, label: "My Cards", route: ROUTES.sandbox, requireBiz: true }, // visible only to business users
  ];

  const socialLinks = [
    { icon: <GitHub />, label: "GitHub", url: "https://github.com/boris2024-spec/cards-proj-Boris-main" },
    { icon: <LinkedIn />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <Email />, label: "Contact", url: "mailto:contact@businesscards.com" },
    { icon: <Phone />, label: "Phone", url: "tel:0545555555" },
    { icon: <LocationOn />, label: "Location", url: "https://maps.app.goo.gl/A6uTkTi8eMzWShxGA" },
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
            gap: { xs: 0, md: 0 }
          }}
        >
          {/* Brand (desktop only) */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 0.5 }}>
              Business Cards
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Connecting businesses worldwide
            </Typography>
          </Box>

          {/* Nav icons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 2 },
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {navigationItems
              .filter(item => !(item.requireBiz && !isBiz))
              .map((item) => (
                <IconButton
                  key={item.label}
                  component={Link}
                  to={item.route}
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

          {/* Social (desktop only) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, justifyContent: 'center' }}>
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
