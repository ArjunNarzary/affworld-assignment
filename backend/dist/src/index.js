"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const port = process.env.PORT || 8000;
(0, database_1.connectDatabase)();
app_1.default.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
