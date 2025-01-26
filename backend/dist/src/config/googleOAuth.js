"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth2Client = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleAuth2Client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "postmessage");
exports.googleAuth2Client = googleAuth2Client;
