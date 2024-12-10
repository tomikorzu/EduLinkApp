import { body, validationResult } from "express-validator";

import { verifyIsEmailInUse } from "./registerService";

export const registerMiddleware = [
    body("fullname")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Full Name cannot be empty")
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u)
        .withMessage("Full Name can only contain letters and spaces")
        .isLength({ min: 3, max: 40 })
        .withMessage("Full Name must be between 3 and 40 characters"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (value) => {
            const result = await verifyIsEmailInUse(value);
            if (result) {
                throw new Error("Email is already in use");
            }
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8, max: 40 })
        .withMessage("Password must be between 8 and 30 characters long")
        .matches(/\d/)
        .withMessage("Password must contain at least one number")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[!@#\$%\^&\*]/)
        .withMessage(
            "Password must contain at least one special character (!@#$%^&*)"
        ),
];

export const validateErrors = (req) => {
    const result = validationResult(req);

    const errors = result.errors;

    if (errors.length > 0) {
        const messages = errors.map((err) => {
            return { error: err.msg, location: err.path };
        });

        return messages;
    }
};
