"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const versionUrl = "/api/v1";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(`${versionUrl}/user`, routes_1.user);
app.use(`${versionUrl}/task`, routes_1.task);
app.use(`${versionUrl}/feed`, routes_1.feed);
app.get("/", (req, res) => {
    res.send("Express + Typescript Server");
});
exports.default = app;
