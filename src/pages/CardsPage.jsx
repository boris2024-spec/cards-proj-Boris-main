import {
  Typography,
  Box,
  Container,
  CircularProgress,
  Alert,
  Paper,
  Fab,
  Zoom,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { BusinessCenter, CardTravel } from "@mui/icons-material";
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import { useCallback, useEffect, useState } from "react";
import BCards from "../cards/components/BCards";
import axios from "axios";
import { useSnack } from "../providers/SnackbarProvider";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "../providers/CustomThemeProvider";
import { buildApiUrl } from "../users/services/userApiServicece";

function CardsPage() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const setSnack = useSnack();
  const [searchParams] = useSearchParams();
  const { token } = useCurrentUser();
  const { isDark } = useTheme();
  const [filter, setFilter] = useState("default"); // default, likes, date

  const getCardsFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        buildApiUrl("cards")
      );

      setCards(response.data);
      setFilteredCards(response.data);
      setSnack("success", `Successfully loaded ${response.data.length} business cards`);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Failed to load business cards. Please try again later.');
      setSnack("error", "Failed to load business cards");
    } finally {
      setIsLoading(false);
    }
  }, [setSnack]);

  const toggleLike = useCallback(
    async (cardId) => {
      try {
        await axios.patch(
          buildApiUrl(`cards/${cardId}`),
          {},
          { headers: { "x-auth-token": token } }
        );

        // Update local state to reflect the like/unlike
        setCards(prevCards =>
          prevCards.map(card => {
            if (card._id === cardId) {
              const isLiked = card.likes.includes(token);
              return {
                ...card,
                likes: isLiked
                  ? card.likes.filter(id => id !== token)
                  : [...card.likes, token]
              };
            }
            return card;
          })
        );

        setSnack("success", "Card preference updated");
      } catch (error) {
        console.error('Error toggling like:', error);
        setSnack("error", "Failed to update card preference please Login");
      }
    },
    [token, setSnack]
  );

  useEffect(() => {
    getCardsFromServer();
  }, [getCardsFromServer]);

  useEffect(() => {
    const searchQuery = searchParams.get("q");

    if (searchQuery) {
      const filtered = cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [searchParams, cards]);

  // Sort cards by filter
  const getSortedCards = () => {
    let sorted = [...filteredCards];
    if (filter === "likes") {
      sorted.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
    } else if (filter === "date") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sorted;
  };

  // Track scrolling to show "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Business Cards...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const searchQuery = searchParams.get("q");

  // Add sorting options array before CardsPage component
  const sortOptions = [
    { label: "No sorting", value: "default" },
    { label: "likes", value: "likes" },
    { label: "Date added", value: "date" },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: isDark ? 'grey.800' : 'grey.50' }}>
      {/* Page Header */}
      <Paper
        elevation={1}
        sx={{
          py: { xs: 3, md: 4 },
          mb: 3,
          borderRadius: 0,
          backgroundColor: isDark ? 'grey.800' : 'primary.main',
          color: isDark ? 'white' : 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <CardTravel sx={{ fontSize: { xs: 32, md: 40 } }} />
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}
              >
                Business Directory
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {searchQuery
                  ? `Search results for "${searchQuery}" - Showing all ${filteredCards.length} matching cards`
                  : `Showing all ${filteredCards.length} business cards`
                }
              </Typography>
            </Box>
            {/* Cards filter */}
            <Box sx={{ ml: { xs: 0, sm: 'auto' }, mt: { xs: 2, sm: 0 }, minWidth: 180 }}>
              <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
                <InputLabel
                  id="sort-select-label"

                  sx={{
                    color: 'white',
                    '&.Mui-focused': { color: 'white' }
                  }}
                >Sort by
                </InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={filter}
                  label="SortBy"
                  onChange={(e) => setFilter(e.target.value)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiSelect-icon': {
                      color: 'white',
                    },
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Cards Grid */}
      <BCards cards={getSortedCards()} toggleLike={toggleLike} />

      {/* Scroll to Top Button */}
      <Zoom in={showScrollToTop}>
        <Fab
          color="primary"
          size="large"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: { xs: 100, md: 120 },
            right: { xs: 30, md: 40 },
            zIndex: 9999,
            backgroundColor: isDark ? 'gray' : 'gray.300',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            border: '2px solid white',
            '&:hover': {
              transform: 'scale(1.15)',
              boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
              backgroundColor: isDark ? 'black' : 'primary.dark'
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <KeyboardControlKeyIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Zoom>
    </Box>
  );
}

export default CardsPage;
