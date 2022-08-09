"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { API_Key, API_Key_Secret, Access_Token, Access_Token_Secret, PORT, Bearer_Token, } = process.env;
const config = {
    api_key: API_Key,
    api_key_secret: API_Key_Secret,
    access_token: Access_Token,
    access_token_secret: Access_Token_Secret,
    port: PORT,
    bearer_token: Bearer_Token
};
exports.default = config;
