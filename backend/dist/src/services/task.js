"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskDatabase = exports.getTaskById = exports.insertTask = exports.getAllTaskByUser = void 0;
const models_1 = require("../models");
const getAllTaskByUser = ({ userId }) => {
    return models_1.Task.find().where({ user: userId }).sort({ updatedAt: -1 });
};
exports.getAllTaskByUser = getAllTaskByUser;
const insertTask = (task) => {
    return models_1.Task.create(task);
};
exports.insertTask = insertTask;
const getTaskById = (id) => {
    return models_1.Task.findById(id).populate("user", "_id name email");
};
exports.getTaskById = getTaskById;
const updateTaskDatabase = (id, data) => {
    return models_1.Task.updateOne({ _id: id }, { $set: data });
};
exports.updateTaskDatabase = updateTaskDatabase;
const deleteTaskById = (id) => {
    return models_1.Task.deleteOne({ _id: id });
};
exports.deleteTaskById = deleteTaskById;
