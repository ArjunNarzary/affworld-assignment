"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertFeed = exports.getAllFeedsData = void 0;
const models_1 = require("../models");
const getAllFeedsData = () => {
    return models_1.Feed.find().sort({ createdAt: -1 }).populate("user", "name email");
};
exports.getAllFeedsData = getAllFeedsData;
const insertFeed = (feed) => {
    return models_1.Feed.create(feed);
};
exports.insertFeed = insertFeed;
