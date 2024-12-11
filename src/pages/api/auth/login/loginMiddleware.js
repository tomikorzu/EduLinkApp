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
        )
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
