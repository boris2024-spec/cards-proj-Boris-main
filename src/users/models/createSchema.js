import Joi from "joi";

// Initial form data for creating a card
export const initialCardForm = {
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: ""
};

// Validation schema based on API requirements
export const cardSchema = {
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().min(9).max(11).pattern(/^0[2-9]\d{7,8}$/).required()
        .messages({
            'string.pattern.base': 'Phone must be a valid Israeli phone number (e.g., 050-1234567)',
            'string.min': 'Phone must be at least 9 characters',
            'string.max': 'Phone must be at most 11 characters'
        }),
    email: Joi.string().min(5).email({ tlds: false }).required(),
    web: Joi.string().min(14).uri().allow(""),
    url: Joi.string().min(14).uri().allow("")
        .messages({
            'string.uri': 'Image URL must be a valid URL',
            'string.min': 'Image URL must be at least 14 characters'
        }),
    alt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().min(1).required()
        .messages({
            'number.base': 'House number must be a number',
            'number.min': 'House number must be at least 1'
        }),
    zip: Joi.string().allow("").pattern(/^\d*$/).optional()

};



