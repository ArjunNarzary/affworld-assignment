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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.findUserById = exports.findByEmail = exports.insertUser = void 0;
const models_1 = require("../models");
const insertUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.User.create(user);
});
exports.insertUser = insertUser;
const findByEmail = (email, showPassword = false) => {
    if (showPassword) {
        return models_1.User.where({ email }).findOne().select("+password");
    }
    else {
        return models_1.User.where({ email }).findOne();
    }
};
exports.findByEmail = findByEmail;
const findUserById = (id) => {
    return models_1.User.findById(id);
};
exports.findUserById = findUserById;
const updateUserById = (id, data) => {
    return models_1.User.updateOne({ _id: id }, { $set: data });
};
exports.updateUserById = updateUserById;
