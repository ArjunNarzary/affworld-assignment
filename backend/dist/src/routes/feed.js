"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.isAuthenticatedUser, controllers_1.getAllFeeds)
    .post(authMiddleware_1.isAuthenticatedUser, middlewares_1.upload.single("image"), controllers_1.createFeed);
exports.default = router;
