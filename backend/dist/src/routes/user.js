"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const database_1 = require("../config/database");
const router = express_1.default.Router();
router.route("/").get((req, res) => {
    (0, database_1.connectDatabase)();
    res.send("User route");
});
router
    .route("/register")
    .post((0, middlewares_1.validateData)(schemas_1.userRegistrationSchema), controllers_1.registerUser);
router.route("/login").post((0, middlewares_1.validateData)(schemas_1.userLoginSchema), controllers_1.loginUser);
router.route("/auth/google").post((0, middlewares_1.validateData)(schemas_1.googleAuthSchema), controllers_1.googleLogin);
router
    .route("/forgot-password")
    .post((0, middlewares_1.validateData)(schemas_1.forgotPasswordSchema), controllers_1.forgotPassword);
router
    .route("/reset-password")
    .post((0, middlewares_1.validateData)(schemas_1.resetPasswordSchema), controllers_1.resetPassword);
router.route("/refresh-token").get(middlewares_1.isAuthenticatedUser, controllers_1.refreshToken);
router.route("/logout").put(controllers_1.logoutUser);
exports.default = router;
