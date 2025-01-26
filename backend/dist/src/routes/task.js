"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const router = express_1.default.Router();
router
    .route("/")
    .get(authMiddleware_1.isAuthenticatedUser, controllers_1.getAllTask)
    .post(authMiddleware_1.isAuthenticatedUser, (0, middlewares_1.validateData)(schemas_1.createTaskSchema), controllers_1.createTask);
router
    .route("/:taskId")
    .put(authMiddleware_1.isAuthenticatedUser, (0, middlewares_1.validateData)(schemas_1.updateTaskSchema), controllers_1.updateTask)
    .delete(authMiddleware_1.isAuthenticatedUser, controllers_1.deleteTask);
exports.default = router;
