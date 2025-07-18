import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    Chip,
    IconButton,
    Button,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Phone,
    Email,
    Language,
    LocationOn,
    Business,
    Person,
    ArrowBack,
    Favorite,
    FavoriteBorder,
    Share
} from '@mui/icons-material';
import axios from 'axios';
import { useSnack } from '../providers/SnackbarProvider';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useTheme } from '../providers/CustomThemeProvider';

function CardDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, user } = useCurrentUser();
    const { isDark } = useTheme();
    const setSnack = useSnack();

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
                );

                setCard(response.data);
            } catch (error) {
                console.error('Error fetching card details:', error);
                setError('Failed to load business card details. Please try again later.');
                setSnack('error', 'Failed to load business card details');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCardDetails();
        }
    }, [id, setSnack]);

    const toggleLike = async () => {
        if (!token) {
            setSnack('warning', 'Please login to like cards');
            return;
        }

        try {
            await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                {},
                { headers: { "x-auth-token": token } }
            );

            // Update local state
            setCard(prevCard => {
                const isLiked = prevCard.likes.includes(user._id);
                return {
                    ...prevCard,
                    likes: isLiked
                        ? prevCard.likes.filter(userId => userId !== user._id)
                        : [...prevCard.likes, user._id]
                };
            });

            setSnack('success', 'Card preference updated');
        } catch (error) {
            console.error('Error toggling like:', error);
            setSnack('error', 'Failed to update card preference');
        }
    };

    const handleShare = async () => {
        if (navigator.share && card) {
            try {
                await navigator.share({
                    title: card.title,
                    text: card.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            setSnack('success', 'Link copied to clipboard');
        }
    };

    const handleCall = (phone) => {
        window.open(`tel:${phone}`, '_self');
    };

    const handleEmail = (email) => {
        window.open(`mailto:${email}`, '_self');
    };

    const handleWebsite = (url) => {
        if (url && !url.startsWith('http')) {
            url = `https://${url}`;
        }
        window.open(url, '_blank');
    };

    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading business details...
                </Typography>
            </Container>
        );
    }

    if (error || !card) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || 'Business card not found'}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    const isLiked = user && card.likes.includes(user._id);

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: isDark ? 'grey.900' : 'grey.50',
            py: 3
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            backgroundColor: isDark ? 'grey.800' : 'white',
                            '&:hover': {
                                backgroundColor: isDark ? 'grey.700' : 'grey.100'
                            }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                        Business Details
                    </Typography>
                    <IconButton onClick={handleShare} color="primary">
                        <Share />
                    </IconButton>
                </Box>

                <Grid container spacing={3}>
                    {/* Business Card Image */}
                    <Grid item xs={12} md={5}>
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                position: 'sticky',
                                top: 20
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={card.image.url}
                                alt={card.title}
                                sx={{
                                    height: { xs: 250, md: 350 },
                                    objectFit: 'cover'
                                }}
                            />
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Business Card
                                    </Typography>
                                    <IconButton
                                        onClick={toggleLike}
                                        color="error"
                                        disabled={!token}
                                    >
                                        {isLiked ? <Favorite /> : <FavoriteBorder />}
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Card ID: {card.bizNumber}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Likes: {card.likes.length}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Business Details */}
                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                backgroundColor: isDark ? 'grey.800' : 'white'
                            }}
                        >
                            {/* Business Header */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h3" component="h1" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="h5" color="text.secondary" gutterBottom>
                                    {card.subtitle}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.7 }}>
                                    {card.description}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Contact Information */}
                            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                                Contact Information
                            </Typography>

                            <Grid container spacing={2}>
                                {/* Phone */}
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: isDark ? 'grey.700' : 'grey.50',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: isDark ? 'grey.600' : 'grey.100'
                                            }
                                        }}
                                        onClick={() => handleCall(card.phone)}
                                    >
                                        <Phone color="primary" />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone
                                            </Typography>
                                            <Typography variant="body1">
                                                {card.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* Email */}
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: isDark ? 'grey.700' : 'grey.50',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: isDark ? 'grey.600' : 'grey.100'
                                            }
                                        }}
                                        onClick={() => handleEmail(card.email)}
                                    >
                                        <Email color="primary" />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Email
                                            </Typography>
                                            <Typography variant="body1">
                                                {card.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* Website */}
                                {card.web && (
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                p: 2,
                                                borderRadius: 2,
                                                backgroundColor: isDark ? 'grey.700' : 'grey.50',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: isDark ? 'grey.600' : 'grey.100'
                                                }
                                            }}
                                            onClick={() => handleWebsite(card.web)}
                                        >
                                            <Language color="primary" />
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Website
                                                </Typography>
                                                <Typography variant="body1">
                                                    {card.web}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Address */}
                            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                                Location
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: isDark ? 'grey.700' : 'grey.50'
                                }}
                            >
                                <LocationOn color="primary" sx={{ mt: 0.5 }} />
                                <Box>
                                    <Typography variant="body1" gutterBottom>
                                        {card.address.street} {card.address.houseNumber}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {card.address.city}, {card.address.state}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {card.address.country} {card.address.zip}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Phone />}
                                    onClick={() => handleCall(card.phone)}
                                    size="large"
                                >
                                    Call Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Email />}
                                    onClick={() => handleEmail(card.email)}
                                    size="large"
                                >
                                    Send Email
                                </Button>
                                {card.web && (
                                    <Button
                                        variant="outlined"
                                        startIcon={<Language />}
                                        onClick={() => handleWebsite(card.web)}
                                        size="large"
                                    >
                                        Visit Website
                                    </Button>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default CardDetailsPage;
