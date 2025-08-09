import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Divider,
    Button,
    Grid,
    Card,
    CardContent,
    useTheme,
    CircularProgress,
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    Badge as UserIcon,
    Edit,
    Delete,
    Login,
} from '@mui/icons-material';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ROUTES from '../routes/routesDict';

function UserProfilePage() {
    const { user, token } = useCurrentUser();
    const theme = useTheme();
    const navigate = useNavigate();

    console.log('UserProfilePage: user =', user);
    console.log('UserProfilePage: token =', token);

    // Если пользователь не авторизован, показываем сообщение с возможностью входа
    if (!token || !user) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <Login sx={{ fontSize: '4rem', color: theme.palette.primary.main, mb: 2 }} />
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Access Denied
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            You need to log in to view your profile.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate(ROUTES.login)}
                            sx={{ px: 4, py: 1.5 }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    // Функция для форматирования имени
    const formatName = (name) => {
        if (!name) return 'User';
        const { first, middle, last } = name;
        return `${first || ''} ${middle || ''} ${last || ''}`.trim();
    };

    // Функция для форматирования адреса
    const formatAddress = (address) => {
        if (!address) return 'Not specified';
        const { street, houseNumber, city, state, country, zip } = address;
        return `${street || ''} ${houseNumber || ''}, ${city || ''}, ${state || ''} ${zip || ''}, ${country || ''}`.trim();
    };

    // Обработчики для кнопок
    const handleEditProfile = () => {
        // Перенаправляем на страницу редактирования профиля
        navigate(ROUTES.editProfile);
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                // 1. Получить все карточки пользователя
                const cardsRes = await fetch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards?userId=${user._id}`,
                    {
                        headers: {
                            "x-auth-token": token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const userCards = cardsRes.ok ? await cardsRes.json() : [];

                // 2. Удалить каждую карточку пользователя параллельно
                await Promise.all(
                    userCards.map(card =>
                        fetch(
                            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    "x-auth-token": token,
                                    "Content-Type": "application/json",
                                },
                            }
                        )
                    )
                );

                // 3. Удалить все лайки пользователя (если API поддерживает такой эндпоинт)
                await fetch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/likes/user/${user._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            "x-auth-token": token,
                            "Content-Type": "application/json",
                        },
                    }
                );

                // 4. Удалить аккаунт пользователя
                const response = await fetch(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            "x-auth-token": token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    alert('Account and all your cards/likes deleted successfully.');
                    window.location.reload(); // Перезагрузка страницы после удаления аккаунта
                } else {
                    let errorMessage = response.statusText;
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const error = await response.json();
                        errorMessage = error.message || errorMessage;
                    } else {
                        const errorText = await response.text();
                        errorMessage = errorText || errorMessage;
                    }
                    alert('Error deleting account: ' + errorMessage);
                }
            } catch (err) {
                alert('Network error: ' + err.message);
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                        ? 'gray.800'
                        : 'white',
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4,
                    }}
                >
                    <img
                        src="https://i.pravatar.cc"
                        alt="User Avatar"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            marginBottom: 16,
                            objectFit: 'cover',
                            border: `3px solid ${theme.palette.primary.main}`
                        }}
                    />

                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        color="text.primary"
                        textAlign="center"
                        sx={{ mb: 1 }}
                    >
                        User Profile
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        textAlign="center"
                    >
                        {formatName(user.name)}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Profile Information */}
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                    {/* Contact Information */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Contact Information
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Email sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Email
                                        </Typography>
                                        <Typography variant="body1">
                                            {user.email || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Phone sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Phone
                                        </Typography>
                                        <Typography variant="body1">
                                            {user.phone || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <UserIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            User ID
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                            {user._id || 'Not available'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Location Information */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Location
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Country
                                        </Typography>
                                        <Typography variant="body1">
                                            {user.address?.country || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            City
                                        </Typography>
                                        <Typography variant="body1">
                                            {user.address?.city || 'Not specified'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ mr: 2, color: theme.palette.primary.main }} />
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatAddress(user.address)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={handleEditProfile}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                        }}
                    >
                        Edit Profile
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleDeleteAccount}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                        }}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default UserProfilePage;
