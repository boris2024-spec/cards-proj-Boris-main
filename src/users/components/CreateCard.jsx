import React from "react";
import {
    TextField,
    Grid
} from "@mui/material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";
import { initialCardForm, cardSchema } from "../models/createSchema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../providers/UserProvider";

function CreateCard({ onCardCreated }) {
    const navigate = useNavigate();
    const { token } = useCurrentUser();
    const handleCreateCard = async (cardData) => {
        try {
            // Преобразуем данные в правильный формат для API
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

            // Удаляем поля, которые не нужны в корне объекта
            delete cardDataForServer.url;
            delete cardDataForServer.alt;
            delete cardDataForServer.state;
            delete cardDataForServer.country;
            delete cardDataForServer.city;
            delete cardDataForServer.street;
            delete cardDataForServer.houseNumber;
            delete cardDataForServer.zip;

            console.log("Отправляемые данные:", cardDataForServer);
            console.log("Токен:", token);

            const response = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                cardDataForServer,
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            console.log("Ответ сервера:", response.data);
            alert("Карточка успешно создана!");
            // Вызываем callback для обновления списка карточек, если он передан
            if (onCardCreated) {
                onCardCreated();
            } else {
                // Если callback не передан, переходим на страницу всех карточек
                navigate("/cards");
            }
        } catch (error) {
            console.error("Ошибка при создании карточки:", error);
            console.error("Детали ошибки:", error.response?.data);
            console.error("Статус ошибки:", error.response?.status);
            console.error("Заголовки ответа:", error.response?.headers);
            alert("Не удалось создать карточку. Проверьте данные и попробуйте снова.");
        }
    };

    const { formDetails, errors, handleChange, handleSubmit } = useForm(
        initialCardForm,
        cardSchema,
        handleCreateCard
    );

    return (

        <Form
            onSubmit={handleSubmit}
            onReset={() => { }}
            title="Create Card"
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
                        label="Housenumber"
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