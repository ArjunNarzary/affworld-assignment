"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@freecluster.9n9rx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=FreeCluster`;
const connectDatabase = () => {
    mongoose_1.default.connect(url).then(() => console.log("Connected to mongobd database"));
};
exports.connectDatabase = connectDatabase;
