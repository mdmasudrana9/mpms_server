"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veriFyToken = void 0;
// import jwt, { JwtPayload } from 'jsonwebtoken'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const veriFyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.veriFyToken = veriFyToken;
