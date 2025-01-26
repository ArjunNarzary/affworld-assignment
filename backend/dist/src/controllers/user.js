"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.refreshToken = exports.logoutUser = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const services_1 = require("../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const libs_1 = require("../libs");
const googleOAuth_1 = require("../config/googleOAuth");
const getCookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
};
const generateToken = (user, expires = "7d") => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: expires,
    });
};
//Match Password
const matchPassword = function (currentPassword, modelPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(currentPassword, modelPassword);
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Check if email already exist
        const emailExist = yield (0, services_1.findByEmail)(req.body.email);
        if (emailExist) {
            res.status(400).json({
                success: false,
                message: "Email is already registered with us",
            });
            return;
        }
        const createUser = yield (0, services_1.insertUser)(req.body);
        if (createUser) {
            //create session cookies
            const token = generateToken(createUser);
            createUser.password = "";
            res.status(201).cookie("token", token, getCookieOptions).json({
                success: true,
                message: "Registration successful",
                user: createUser,
                token: token,
            });
        }
        else {
            res.status(500).json(libs_1.ERROR_MESSAGE);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, services_1.findByEmail)(req.body.email, true);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email is not registered with us.",
            });
            return;
        }
        const checkPassword = yield matchPassword(req.body.password, user.password);
        if (!checkPassword) {
            res.status(400).json({
                success: false,
                message: "Password didn't match.",
            });
            return;
        }
        const token = generateToken(user);
        user.password = "";
        res.status(201).cookie("token", token, getCookieOptions).json({
            success: true,
            message: "Login successful",
            user: user,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.loginUser = loginUser;
//Generate reset url for password reset
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, services_1.findByEmail)(req.body.email);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email is not registered with us.",
            });
            return;
        }
        //Generate reset token
        const token = generateToken(user, "15m");
        const redirectUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
        //Here you can send email to user with reset url
        res.status(200).json({
            success: true,
            message: "Password reset link.",
            redirectUrl: redirectUrl,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.forgotPassword = forgotPassword;
//Reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        //check if token expired
        if (Date.now() > decoded.exp * 1000) {
            res.status(400).json({
                success: false,
                message: "Token expired",
            });
            return;
        }
        const user = yield (0, services_1.findUserById)(decoded._id);
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email is not registered with us.",
            });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const updatedUser = yield (0, services_1.updateUserById)(user._id, {
            password: hashPassword,
            name: user.name,
            email: user.email,
            socialLogin: user.socialLogin,
        });
        if (!updatedUser) {
            res.status(400).json({
                success: false,
                message: "Failed to update password",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.resetPassword = resetPassword;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).clearCookie("token").json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.logoutUser = logoutUser;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authUser } = req.body;
        //create new session cookies
        const token = generateToken(authUser, "15m");
        res.status(201).cookie("token", token, getCookieOptions).json({
            success: true,
            message: "Registration successful",
            user: authUser,
            token: token,
        });
    }
    catch (error) {
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.refreshToken = refreshToken;
//Handle google login
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { code } = req.body;
        const { tokens } = yield googleOAuth_1.googleAuth2Client.getToken(code);
        const userInfo = yield fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        }).then((res) => res.json());
        if (userInfo.email && userInfo.name) {
            let user = yield (0, services_1.findByEmail)(userInfo.email);
            if (user) {
                yield (0, services_1.updateUserById)(user._id.toString(), Object.assign(Object.assign({}, user), { name: (_a = user.name) !== null && _a !== void 0 ? _a : "", socialLogin: true }));
            }
            else {
                const payload = {
                    name: userInfo.name,
                    email: userInfo.email,
                    socialLogin: true,
                    password: "jdkagsjdgsaudtas78dtsa8d7ts232dsd",
                };
                user = yield (0, services_1.insertUser)(payload);
            }
            if (user) {
                //create session cookies
                const token = generateToken(user, "15m");
                user.password = "";
                res.status(201).cookie("token", token, getCookieOptions).json({
                    success: true,
                    message: "Login successful",
                    user: user,
                    token: token,
                });
            }
        }
        else {
            res.status(500).json(libs_1.ERROR_MESSAGE);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.googleLogin = googleLogin;
