import React from "react";
import {
    TextField,
    Grid
} from "@mui/material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";
import { initialCardForm, cardSchema } from "../models/createSchema";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../providers/UserProvider";
import { useSnack } from "../../providers/SnackbarProvider";
import { useEffect, useState } from "react";

function CreateCard({ onCardCreated }) {
    const navigate = useNavigate();
    const { token } = useCurrentUser();
    const { id } = useParams();
    const setSnack = useSnack();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [cardData, setCardData] = useState(null);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            setLoading(true);
            // Получаем данные карточки для редактирования
            axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`)
                .then(res => {
                    const data = res.data;
                    setCardData(data);
                    // Заполняем форму
                    handleFillForm(data);
                    setSnack('success', 'Card data loaded successfully');
                })
                .catch((error) => {
                    console.error('Error loading card data:', error);
                    let errorMessage = 'Error loading card data';

                    if (error.response) {
                        if (error.response.status === 404) {
                            errorMessage = 'Card not found';
                        } else if (error.response.status === 401) {
                            errorMessage = 'You are not authorized to view this card';
                        } else if (error.response.status === 403) {
                            errorMessage = 'You don\'t have permission to edit this card';
                        }
                    } else if (error.request) {
                        errorMessage = 'Network error. Please check your connection.';
                    }

                    setSnack('error', errorMessage);
                    navigate('/sandbox'); // Перенаправляем обратно к списку карточек
                })
                .finally(() => setLoading(false));
        }
    }, [id, setSnack, navigate]);

    const handleFillForm = (data) => {
        // Преобразуем данные карточки в формат формы
        const filled = {
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            phone: data.phone || '',
            email: data.email || '',
            web: data.web || '',
            url: data.image?.url || '',
            alt: data.image?.alt || '',
            state: data.address?.state || '',
            country: data.address?.country || '',
            city: data.address?.city || '',
            street: data.address?.street || '',
            houseNumber: data.address?.houseNumber || '',
            zip: data.address?.zip || '',
        };
        // Устанавливаем значения в useForm
        Object.keys(filled).forEach(key => {
            handleChange({ target: { name: key, value: filled[key] } });
        });
    };

    const handleCreateOrUpdateCard = async (cardData) => {
        try {
            // Проверяем авторизацию
            if (!token) {
                setSnack('error', 'You must be logged in to create or edit cards');
                return;
            }

            // Проверяем наличие обязательных полей
            if (!cardData.title || !cardData.subtitle || !cardData.description ||
                !cardData.phone || !cardData.email || !cardData.country ||
                !cardData.city || !cardData.street || !cardData.houseNumber) {
                setSnack('error', 'Please fill in all required fields');
                return;
            }

            // Преобразуем houseNumber в число
            const houseNumber = parseInt(cardData.houseNumber);
            if (isNaN(houseNumber) || houseNumber < 1) {
                setSnack('error', 'House number must be a valid number greater than 0');
                return;
            }

            // Преобразуем zip в число, если оно указано
            let zip = null;
            if (cardData.zip && cardData.zip.trim() !== '') {
                zip = parseInt(cardData.zip);
                if (isNaN(zip)) {
                    setSnack('error', 'ZIP code must be a valid number');
                    return;
                }
            }

            const cardDataForServer = {
                title: cardData.title.trim(),
                subtitle: cardData.subtitle.trim(),
                description: cardData.description.trim(),
                phone: cardData.phone.trim(),
                email: cardData.email.trim(),
                web: cardData.web ? cardData.web.trim() : "",
                image: {
                    url: cardData.url ? cardData.url.trim() : "",
                    alt: cardData.alt ? cardData.alt.trim() : ""
                },
                address: {
                    state: cardData.state ? cardData.state.trim() : "",
                    country: cardData.country.trim(),
                    city: cardData.city.trim(),
                    street: cardData.street.trim(),
                    houseNumber: houseNumber,
                    zip: zip
                }
            };

            if (editMode && id) {
                // PUT-запрос для обновления
                await axios.put(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                    cardDataForServer,
                    { headers: { "x-auth-token": token } }
                );
                setSnack('success', 'The card has been updated successfully!');
                navigate(`/card-details/${id}`);
            } else {
                // POST-запрос для создания
                const response = await axios.post(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                    cardDataForServer,
                    { headers: { "x-auth-token": token } }
                );
                setSnack('success', 'Card successfully created!');
                // Получаем ID созданной карточки из ответа сервера
                const createdCardId = response.data._id || response.data.id;
                navigate(`/card-details/${createdCardId}`);
            }
            if (onCardCreated) {
                onCardCreated();
            }
        } catch (error) {
            console.error('Error saving card:', error);

            // Более детальная обработка ошибок
            let errorMessage = "Error saving card. Please try again.";

            if (error.response) {
                // Ошибка от сервера
                if (error.response.status === 400) {
                    errorMessage = "Invalid card data. Please check all required fields.";
                } else if (error.response.status === 401) {
                    errorMessage = "You are not authorized. Please login again.";
                } else if (error.response.status === 403) {
                    errorMessage = "You don't have permission to perform this action.";
                } else if (error.response.status >= 500) {
                    errorMessage = "Server error. Please try again later.";
                } else if (error.response.data && typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                // Ошибка сети
                errorMessage = "Network error. Please check your connection and try again.";
            }

            setSnack('error', errorMessage);
        }
    };

    const { formDetails, errors, handleChange, handleSubmit, reset } = useForm(
        initialCardForm,
        cardSchema,
        handleCreateOrUpdateCard
    );

    if (loading) return <div>loading...</div>;

    return (
        <Form
            onSubmit={handleSubmit}
            onReset={reset}
            title={editMode ? "Edit card" : "Create a card"}
            styles={{ maxWidth: "600px" }}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.title}
                        onChange={handleChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="subtitle"
                        label="Subtitle"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.subtitle}
                        onChange={handleChange}
                        error={Boolean(errors.subtitle)}
                        helperText={errors.subtitle}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.phone}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        value={formDetails.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="web"
                        label="Web"
                        variant="outlined"
                        fullWidth
                        value={formDetails.web}
                        onChange={handleChange}
                        error={Boolean(errors.web)}
                        helperText={errors.web}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="url"
                        label="Image url"
                        variant="outlined"
                        fullWidth
                        value={formDetails.url}
                        onChange={handleChange}
                        error={Boolean(errors.url)}
                        helperText={errors.url}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="alt"
                        label="Image alt"
                        variant="outlined"
                        fullWidth
                        value={formDetails.alt}
                        onChange={handleChange}
                        error={Boolean(errors.alt)}
                        helperText={errors.alt}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="state"
                        label="State"
                        variant="outlined"
                        fullWidth
                        value={formDetails.state}
                        onChange={handleChange}
                        error={Boolean(errors.state)}
                        helperText={errors.state}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="country"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.country}
                        onChange={handleChange}
                        error={Boolean(errors.country)}
                        helperText={errors.country}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="city"
                        label="City"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.city}
                        onChange={handleChange}
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="street"
                        label="Street"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.street}
                        onChange={handleChange}
                        error={Boolean(errors.street)}
                        helperText={errors.street}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="houseNumber"
                        label="House number"
                        variant="outlined"
                        fullWidth
                        required
                        value={formDetails.houseNumber}
                        onChange={handleChange}
                        error={Boolean(errors.houseNumber)}
                        helperText={errors.houseNumber}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        name="zip"
                        label="Zip"
                        variant="outlined"
                        fullWidth
                        value={formDetails.zip}
                        onChange={handleChange}
                        error={Boolean(errors.zip)}
                        helperText={errors.zip}
                    />
                </Grid>
            </Grid>
        </Form>


    );
}

export default CreateCard;