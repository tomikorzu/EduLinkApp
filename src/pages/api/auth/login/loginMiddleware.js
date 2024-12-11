import { body, validationResult } from "express-validator";

import { verifyEmailExist, verifyPasswordOfEmail } from "./loginService"

export const loginMiddleware = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (value) => {
            await verifyEmailExist(value);
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
        .withMessage("Password contains invalid characters")
        .custom(async (value, { req }) => {
            await verifyPasswordOfEmail(value, req.body.email);
        }),
]

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
