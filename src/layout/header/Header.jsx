import {
  AppBar,
  Box,
  TextField,
  Toolbar,
  IconButton,
  Tooltip,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme,
  Collapse
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  Search,
  Menu as MenuIcon,
  Home,
  Info,
  Favorite,
  Science,
  Login,
  PersonAdd,
  Close,
  ExpandLess,
  ExpandMore,
  AccountCircle,
  Logout,
  // add social network icons
  GitHub,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Badge as BadgeIcon // import BadgeIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";
import { useTheme } from "../../providers/CustomThemeProvider";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { removeToken } from "../../users/services/localStorageService";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Header() {
  const { toggleMode, isDark } = useTheme();
  const muiTheme = useMuiTheme();
  const { user } = useCurrentUser();
  console.log("user:", user);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Check if screen is mobile
  const isMobile = useMediaQuery('(max-width:1100px)');

  // Add synchronization of query with URL q parameter
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);


  useEffect(() => {
    setSearchParams({ q: query });
  }, [query, setSearchParams]);

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove token from localStorage using service
    removeToken();
    // Reload page
    window.location.reload();
  };

  const menuItems = [
    { label: 'Home', path: ROUTES.root, icon: <Home /> },
    { label: 'About', path: ROUTES.about, icon: <Info /> },
    { label: 'Favorite Cards', path: ROUTES.favorite, icon: <Favorite /> },
    { label: 'My Cards', path: ROUTES.sandbox, icon: <BadgeIcon /> }, // change icon to BadgeIcon
  ];

  const authItems = user ? [] : [
    { label: 'Register', path: ROUTES.register, icon: <PersonAdd /> },
    { label: 'Login', path: ROUTES.login, icon: <Login /> },
  ];

  // socialLinks for Mobile Drawer
  const socialLinks = [
    { icon: <GitHub />, label: "GitHub", url: "https://github.com" },
    { icon: <LinkedIn />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <Email />, label: "Contact", url: "mailto:contact@businesscards.com" },
    { icon: <Phone />, label: "Phone", url: "tel:0545555555" },
    { icon: <LocationOn />, label: "Location", url: "https://maps.app.goo.gl/A6uTkTi8eMzWShxGA" },
  ];

  // Add helper function for name formatting
  const capitalize = (str) => str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Business Cards
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: 'white' }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Search Section */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search business cards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Theme Toggle */}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleMode}>
            <ListItemIcon>
              {isDark ? <LightMode /> : <DarkMode />}
            </ListItemIcon>
            <ListItemText
              primary={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* User/Auth Section */}
      <Divider />
      <List>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation(ROUTES.userProfile)}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={`Welcome, ${capitalize(user.name?.first)}!`}
                  secondary={user.email}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          authItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      {/* Social Links Section */}
      <Divider />
      <List>
        {socialLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.url} target="_blank" rel="noopener noreferrer">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={4}>
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo/Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              mr: isMobile ? 0 : 4,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => navigate(ROUTES.root)}
          >
            Business Cards
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.label}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    textTransform: 'none',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'background-color 0.3s ease',
                      borderRadius: 2

                    }
                  }}
                >
                  {item.icon}
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {item.label}
                  </Typography>
                </IconButton>
              ))}
            </Box>
          )}

          {/* Desktop Search */}
          {!isMobile && (
            <TextField
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              sx={{
                mr: 2,
                backgroundColor: '#fff',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  color: 'black',
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.7)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(0, 0, 0, 0.6)',
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(0, 0, 0, 0.6)' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Mobile Search Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(!searchOpen)}
              sx={{ mr: 1 }}
            >
              <Search />
            </IconButton>
          )}

          {/* Theme Toggle Button */}
          <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
            <IconButton
              onClick={toggleMode}
              sx={{
                color: "white",
                mr: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(180deg)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          {/* Desktop Auth Links or User Icon */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {user ? (
                <>
                  <Tooltip title={`Welcome, ${capitalize(user.name?.first)}!`} arrow>

                    <IconButton
                      color="inherit"
                      onClick={() => navigate(ROUTES.userProfile)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Logout" arrow>
                    <IconButton
                      color="inherit"
                      onClick={handleLogout}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <Logout />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                authItems.map((item) => (
                  <IconButton
                    key={item.label}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{
                      textTransform: 'none',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    {item.icon}
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {item.label}
                    </Typography>
                  </IconButton>
                ))
              )}
            </Box>
          )}
        </Toolbar>

        {/* Mobile Search Bar */}
        {isMobile && (
          <Collapse in={searchOpen}>
            <Box sx={{ p: 2, backgroundColor: 'primary.dark' }}>
              <TextField
                fullWidth
                placeholder="Search business cards..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                sx={{
                  backgroundColor: isDark ? '#222' : '#fff',
                  borderRadius: 1,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Collapse>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
