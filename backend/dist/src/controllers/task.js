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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTask = void 0;
const libs_1 = require("../libs");
const services_1 = require("../services");
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body.authUser;
        const tasks = yield (0, services_1.getAllTaskByUser)({
            userId: _id,
        });
        res.status(200).json({
            success: true,
            tasks,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.getAllTask = getAllTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.body.authUser;
        const task = yield (0, services_1.insertTask)({
            name: req.body.name,
            description: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.description) || "",
            user: _id,
        });
        if (!task) {
            res.status(400).json(libs_1.ERROR_MESSAGE);
            return;
        }
        res.status(201).json({
            success: true,
            task,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.body.authUser;
        const { taskId } = req.params;
        //Validate task_id
        if (!ObjectId.isValid(taskId)) {
            res.status(400).json({
                success: false,
                message: "Invalid task selected",
            });
            return;
        }
        const task = yield (0, services_1.getTaskById)(taskId);
        if (!task) {
            res.status(400).json({
                success: false,
                message: "Task not found",
            });
            return;
        }
        if (((_a = task.user) === null || _a === void 0 ? void 0 : _a._id.toString()) !== _id.toString()) {
            res.status(400).json({
                success: false,
                message: "You are not allowed to update this task.",
            });
            return;
        }
        const modifyTask = yield (0, services_1.updateTaskDatabase)(taskId, req.body);
        if (!modifyTask) {
            res.status(500).json(libs_1.ERROR_MESSAGE);
        }
        const updatedTask = yield (0, services_1.getTaskById)(taskId);
        res.status(200).json({
            success: true,
            task: updatedTask,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.body.authUser;
        const { taskId } = req.params;
        //Validate task_id
        if (!ObjectId.isValid(taskId)) {
            res.status(400).json({
                success: false,
                message: "Invalid task selected",
            });
            return;
        }
        const task = yield (0, services_1.getTaskById)(taskId);
        if (!task) {
            res.status(400).json({
                success: false,
                message: "Task not found",
            });
            return;
        }
        if (((_a = task.user) === null || _a === void 0 ? void 0 : _a._id.toString()) !== _id.toString()) {
            res.status(400).json({
                success: false,
                message: "You are not allowed to update this task.",
            });
            return;
        }
        const removeTask = yield (0, services_1.deleteTaskById)(taskId);
        if (!removeTask) {
            res.status(400).json(libs_1.ERROR_MESSAGE);
            return;
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(libs_1.ERROR_MESSAGE);
    }
});
exports.deleteTask = deleteTask;
