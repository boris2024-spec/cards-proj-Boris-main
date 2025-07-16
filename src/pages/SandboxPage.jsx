import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Fab,
  Zoom,
  Grid
} from "@mui/material";
import { BusinessCenter, ArrowUpward, CardTravel } from "@mui/icons-material";
import axios from "axios";
import { useCurrentUser } from "../users/providers/UserProvider";
import { useTheme } from "../providers/CustomThemeProvider";
import { useSnack } from "../providers/SnackbarProvider";
import BCards from "../cards/components/BCards";
import CreateCard from "../users/components/CreateCard";

function SandboxPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { token } = useCurrentUser();
  const { isDark } = useTheme();
  const setSnack = useSnack();

  const getMyCardsFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        {
          headers: {
            "x-auth-token": token
          }
        }
      );

      setCards(response.data);
      setSnack("success", `Successfully loaded ${response.data.length} of your business cards`);
    } catch (error) {
      console.error('Error fetching my cards:', error);
      setError('Failed to load your business cards. Please try again later.');
      setSnack("error", "Failed to load your business cards");
    } finally {
      setIsLoading(false);
    }
  }, [token, setSnack]);

  const toggleLike = useCallback(
    async (cardId) => {
      try {
        await axios.patch(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
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
        setSnack("error", "Failed to update card preference");
      }
    },
    [token, setSnack]
  );

  // Функция для обновления списка карточек после создания новой
  const refreshCards = useCallback(() => {
    if (token) {
      getMyCardsFromServer();
      setShowCreateForm(false);
      setSnack("success", "Card successfully created");
    }
  }, [getMyCardsFromServer, token, setSnack]);

  // Функция для удаления карточки из состояния
  const handleDeleteCard = useCallback((cardId) => {
    setCards(prevCards => prevCards.filter(card => card._id !== cardId));
    setSnack("success", "The card has been successfully deleted.");
  }, [setSnack]);

  useEffect(() => {
    if (token) {
      getMyCardsFromServer();
    } else {
      setError('Please log in to view your cards');
      setIsLoading(false);
    }
  }, [getMyCardsFromServer, token]);

  // Отслеживание прокрутки для показа кнопки "вернуться наверх"
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
                My Business Cards - Create & Manage Cards
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                Create new business cards and view your existing ones
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Create Card Form */}
          <Grid item xs={12} md={8}>
            {cards.length > 0 && !showCreateForm ? (
              <Fab
                color="primary"
                size="large"
                onClick={() => setShowCreateForm(true)}
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: '2rem',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                +
              </Fab>
            ) : (
              <Paper elevation={2} sx={{ p: 3 }}>
                {cards.length > 0 && (
                  <Fab
                    size="small"
                    onClick={() => setShowCreateForm(false)}
                    sx={{ minWidth: 40, width: 40, height: 40 }}
                  >
                    ×
                  </Fab>
                )}
                <CreateCard onCardCreated={refreshCards} />
              </Paper>
            )}
          </Grid>

          {/* My Cards Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                My Business Cards
              </Typography>

              {isLoading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress size={40} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Loading your cards...
                  </Typography>
                </Box>
              ) : error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              ) : cards.length > 0 ? (
                <BCards cards={cards} toggleLike={toggleLike} onDelete={handleDeleteCard} />
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    You haven't created any business cards yet.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Use the form on the left to create your first card!
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

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
          <ArrowUpward sx={{ fontSize: 28 }} />
        </Fab>
      </Zoom>
    </Box>
  );
}

export default SandboxPage;
