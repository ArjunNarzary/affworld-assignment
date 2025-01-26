"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedSchema = void 0;
const zod_1 = require("zod");
exports.createFeedSchema = zod_1.z.object({
    caption: zod_1.z.string(),
});
