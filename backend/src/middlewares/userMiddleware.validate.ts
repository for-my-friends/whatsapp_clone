import express from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map((d) => d.message),
            });
        }
        next();
    };
};