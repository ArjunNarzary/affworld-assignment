"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.googleAuthSchema = exports.forgotPasswordSchema = exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
exports.userRegistrationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Please provide your name"),
    email: zod_1.z.string().email("Please provide valid email"),
    password: zod_1.z.string().min(8, "Password must be atleast 8 characters"),
    socialLogin: zod_1.z.boolean().optional(),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please provide valid email"),
    password: zod_1.z.string().min(8),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please provide valid email"),
});
exports.googleAuthSchema = zod_1.z.object({
    code: zod_1.z.string(),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    password: zod_1.z.string().min(8, "Password must be atleast 8 characters"),
});
