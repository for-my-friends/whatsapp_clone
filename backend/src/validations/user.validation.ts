import Joi from "joi";

export const completeProfileSchema = Joi.object({
    name: Joi.string().max(50).optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().max(200).optional(),
    dob: Joi.date().iso().optional(),
    // profileImage is handled by multer, so not validated here
});