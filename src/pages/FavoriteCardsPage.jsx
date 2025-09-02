import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Container,
  CircularProgress,
  Alert,
  Paper,
  Fab,
  Zoom,
  Button
} from "@mui/material";
import { Favorite, FavoriteBorder, BusinessCenter } from "@mui/icons-material";
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import BCards from "../cards/components/BCards";
import axios from "axios";
import { useSnack } from "../providers/SnackbarProvider";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "../providers/CustomThemeProvider";
import { buildApiUrl } from "../users/services/userApiServicece";

function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [filteredFavoriteCards, setFilteredFavoriteCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const setSnack = useSnack();
  const { token, user } = useCurrentUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useTheme();

  const getCardsFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        buildApiUrl("cards")
      );

      setCards(response.data);

      // Filter cards that are liked by the current user
      if (user) {
        const userFavorites = response.data.filter(card =>
          card.likes.includes(user._id)
        );
        setFavoriteCards(userFavorites);
        setSnack("success", `Found ${userFavorites.length} favorite cards`);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Failed to load favorite cards. Please try again later.');
      setSnack("error", "Failed to load favorite cards");
    } finally {
      setIsLoading(false);
    }
  }, [setSnack, user]);

  const toggleLike = useCallback(
    async (cardId) => {
      if (!token) {
        setSnack("warning", "Please login to manage favorites");
        return;
      }

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
              const isLiked = card.likes.includes(user._id);
              return {
                ...card,
                likes: isLiked
                  ? card.likes.filter(id => id !== user._id)
                  : [...card.likes, user._id]
              };
            }
            return card;
          })
        );

        // Update favorite cards - remove if unliked
        setFavoriteCards(prevFavorites => {
          const card = prevFavorites.find(c => c._id === cardId);
          if (card) {
            const isLiked = card.likes.includes(user._id);
            if (isLiked) {
              // Remove from favorites
              setSnack("success", "Card removed from favorites");
              return prevFavorites.filter(c => c._id !== cardId);
            }
          }
          return prevFavorites;
        });

      } catch (error) {
        console.error('Error toggling like:', error);
        setSnack("error", "Failed to update card preference");
      }
    },
    [token, user, setSnack]
  );

  useEffect(() => {
    if (!user) {
      setError("Please login to view your favorite cards");
      setIsLoading(false);
      return;
    }
    getCardsFromServer();
  }, [getCardsFromServer, user]);

  // Handle search filtering
  useEffect(() => {
    const searchQuery = searchParams.get("q");

    if (searchQuery) {
      const filtered = favoriteCards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFavoriteCards(filtered);
    } else {
      setFilteredFavoriteCards(favoriteCards);
    }
  }, [searchParams, favoriteCards]);

  // Track scroll for scroll-to-top button
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

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: isDark ? 'grey.800' : 'grey.50' }}>
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <FavoriteBorder sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            Login Required
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            You need to be logged in to view your favorite business cards.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Your Favorite Cards...
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
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Back to All Cards
        </Button>
      </Container>
    );
  }

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
          color: 'white',
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
            <Favorite color="error" sx={{ fontSize: { xs: 32, md: 40 } }} />
            <Box>
              <Typography

                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}
              >
                My Favorite Cards
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                {(() => {
                  const searchQuery = searchParams.get("q");
                  if (searchQuery) {
                    return `Search results for "${searchQuery}" in favorites - Showing ${filteredFavoriteCards.length} of ${favoriteCards.length} cards`;
                  }
                  return favoriteCards.length > 0
                    ? `You have ${favoriteCards.length} favorite business card${favoriteCards.length === 1 ? '' : 's'}`
                    : "You haven't added any cards to favorites yet";
                })()}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Cards Grid or Empty State */}
      {favoriteCards.length > 0 ? (
        filteredFavoriteCards.length > 0 ? (
          <BCards cards={filteredFavoriteCards} toggleLike={toggleLike} />
        ) : (
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <FavoriteBorder sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              No Matching Favorite Cards
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              No favorite cards match your search criteria "{searchParams.get("q")}".
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setSearchParams({});
                navigate('/like-cards');
              }}
            >
              Clear Search
            </Button>
          </Container>
        )
      ) : (
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <FavoriteBorder sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            No Favorite Cards Yet
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Start exploring business cards and click the heart icon to add them to your favorites.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            startIcon={<BusinessCenter />}
          >
            Browse All Cards
          </Button>
        </Container>
      )}

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

export default FavoriteCardsPage;
