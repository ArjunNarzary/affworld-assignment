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
exports.createFeed = exports.getAllFeeds = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const libs_1 = require("../libs");
const services_1 = require("../services");
const cloudinary_1 = require("../config/cloudinary");
const getAllFeeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feeds = yield (0, services_1.getAllFeedsData)();
        res.status(200).json({
            success: true,
            feeds,
        });
    }
    catch (error) {
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.getAllFeeds = getAllFeeds;
const createFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { token } = req.cookies;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const user = yield (0, services_1.findUserById)(decoded._id);
        const { caption } = req.body;
        if (!((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path)) {
            res.status(500).json(libs_1.ERROR_MESSAGE);
            return;
        }
        const result = yield (0, cloudinary_1.uploadOnCloudinary)(((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.path) || "");
        if (!result) {
            res.status(500).json(libs_1.ERROR_MESSAGE);
            return;
        }
        const feed = yield (0, services_1.insertFeed)({
            caption,
            imgUrl: result === null || result === void 0 ? void 0 : result.url,
            public_id: result === null || result === void 0 ? void 0 : result.public_id,
            user: user === null || user === void 0 ? void 0 : user._id,
        });
        if (!feed) {
            res.status(500).json(libs_1.ERROR_MESSAGE);
            return;
        }
        res.status(201).json({
            success: true,
            feed,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.createFeed = createFeed;
