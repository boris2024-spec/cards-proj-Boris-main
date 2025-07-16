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
import { useEffect, useState } from "react";

function CreateCard({ onCardCreated }) {
    const navigate = useNavigate();
    const { token } = useCurrentUser();
    const { id } = useParams();
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
                })
                .catch(() => alert('Error loading card data'))
                .finally(() => setLoading(false));
        }
    }, [id]);

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
            const cardDataForServer = {
                ...cardData,
                houseNumber: parseInt(cardData.houseNumber) || 0,
                zip: cardData.zip ? parseInt(cardData.zip) : null,
                image: {
                    url: cardData.url,
                    alt: cardData.alt
                },
                address: {
                    state: cardData.state,
                    country: cardData.country,
                    city: cardData.city,
                    street: cardData.street,
                    houseNumber: parseInt(cardData.houseNumber) || 0,
                    zip: cardData.zip ? parseInt(cardData.zip) : null
                }
            };
            delete cardDataForServer.url;
            delete cardDataForServer.alt;
            delete cardDataForServer.state;
            delete cardDataForServer.country;
            delete cardDataForServer.city;
            delete cardDataForServer.street;
            delete cardDataForServer.houseNumber;
            delete cardDataForServer.zip;

            if (editMode && id) {
                // PUT-запрос для обновления
                await axios.put(
                    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                    cardDataForServer,
                    { headers: { "x-auth-token": token } }
                );
                alert('The card has been updated successfully!');
                navigate(`/card-details/${id}`);
            } else {
                // POST-запрос для создания
                await axios.post(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                    cardDataForServer,
                    { headers: { "x-auth-token": token } }
                );
                alert('Card successfully created!');
                navigate(`/card-details/${id}`);
            }
            if (onCardCreated) {
                onCardCreated();
            } else {
                navigate(`/card-details/${id}`);
            }
        } catch (error) {
            alert("Error saving card. Check your details and try again.");
        }
    };

    const { formDetails, errors, handleChange, handleSubmit } = useForm(
        initialCardForm,
        cardSchema,
        handleCreateOrUpdateCard
    );

    if (loading) return <div>Загрузка...</div>;

    return (
        <Form
            onSubmit={handleSubmit}
            onReset={() => { }}
            title={editMode ? "Edit card" : "Create a card"}
            styles={{ maxWidth: "600px", mx: "auto" }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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