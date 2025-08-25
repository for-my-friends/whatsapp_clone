import Joi from "joi";

export const registerAccount = Joi.object({
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().max(15).messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number must be 10-15 digits"
    }),
});

export const verifyCode = Joi.object({
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    code: Joi.string().length(6).required(),
    deviceId: Joi.string().optional(),
    referredBy: Joi.string().optional(),
});

export const changePhoneNumber = Joi.object({
    oldPhoe: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    newPhone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
});