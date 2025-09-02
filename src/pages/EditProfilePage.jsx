import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Avatar,
    useTheme,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Save,
    Cancel,
    Person,
} from '@mui/icons-material';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routesDict';
import axios from 'axios';
import { buildApiUrl } from '../users/services/userApiServicece';

function EditProfilePage() {
    const { user, token, setUser } = useCurrentUser();
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        imageUrl: '',
        imageAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
    });

    // Load user data into the form
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: String(user.name?.first || ''),
                middleName: String(user.name?.middle || ''),
                lastName: String(user.name?.last || ''),
                phone: String(user.phone || ''),
                email: String(user.email || ''),
                imageUrl: String(user.image?.url || ''),
                imageAlt: String(user.image?.alt || ''),
                state: String(user.address?.state || ''),
                country: String(user.address?.country || ''),
                city: String(user.address?.city || ''),
                street: String(user.address?.street || ''),
                houseNumber: String(user.address?.houseNumber || ''),
                zip: String(user.address?.zip || ''),
            });
        }
    }, [user]);

    // If user is not authorized
    if (!token || !user) {
        navigate(ROUTES.login);
        return null;
    }

    // Form fields change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: String(value || '')
        }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Simple validation
        if (!String(formData.firstName || '').trim() || !String(formData.lastName || '').trim()) {
            setError('First name and last name are required');
            setLoading(false);
            return;
        }

        if (!String(formData.phone || '').trim()) {
            setError('Phone is required');
            setLoading(false);
            return;
        }

        try {
            const updateData = {
                name: {
                    first: String(formData.firstName || '').trim(),
                    middle: String(formData.middleName || '').trim(),
                    last: String(formData.lastName || '').trim(),
                },
                phone: String(formData.phone || '').trim(),
                // email is not included in update - server does not allow changing it
                image: {
                    url: String(formData.imageUrl || '').trim() || "",
                    alt: String(formData.imageAlt || '').trim() || "user image",
                },
                address: {
                    state: String(formData.state || '').trim(),
                    country: String(formData.country || '').trim(),
                    city: String(formData.city || '').trim(),
                    street: String(formData.street || '').trim(),
                    houseNumber: String(formData.houseNumber || '').trim(),
                    zip: String(formData.zip || '').trim(),
                },
            };

            console.log('Sending update data:', updateData);
            console.log('User ID:', user._id);
            console.log('Token:', token);

            const response = await axios.put(
                buildApiUrl(`users/${user._id}`), // единообразно без ведущего '/'
                updateData,
                {
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Update response:', response);
            setUser(response.data);
            setSuccess('Profile updated successfully!');
            setTimeout(() => {
                navigate(ROUTES.userProfile);
            }, 2000);

        } catch (error) {
            console.error('Error updating profile:', error);
            console.error('Error response:', error.response);

            let errorMessage = 'Failed to update profile';
            if (error.response) {
                if (error.response.data) {
                    if (typeof error.response.data === 'string') {
                        errorMessage = error.response.data;
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    } else if (error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Cancel handler
    const handleCancel = () => {
        navigate(ROUTES.userProfile);
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
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: theme.palette.primary.main,
                        }}
                        src={formData.imageUrl}
                    >
                        <Person sx={{ fontSize: '2rem' }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Edit Profile
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Update your personal information
                    </Typography>
                </Box>

                {/* Alerts */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} >
                    <Grid container spacing={3} >
                        {/* Personal Information */}


                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Middle Name"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Contact Information */}




                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* Image Information */}


                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Image URL"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Image Alt Text"
                                name="imageAlt"
                                value={formData.imageAlt}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Address Information */}


                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="House Number"
                                name="houseNumber"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                fullWidth
                                label="ZIP Code"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Action Buttons */}
                        <Grid size={{ xs: 12 }}
                            fullWidth>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    mt: 3,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                    disabled={loading}
                                    sx={{ px: 4, py: 1.5, flex: 1 }}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<Cancel />}
                                    onClick={handleCancel}
                                    color='error'
                                    disabled={loading}
                                    sx={{ px: 4, py: 1.5, flex: 1 }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default EditProfilePage;
