"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const m3u8_proxy_1 = __importDefault(require("./routes/m3u8-proxy"));
const ts_proxy_1 = __importDefault(require("./routes/ts-proxy"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Basic route
app.get("/m3u8-proxy.m3u8", m3u8_proxy_1.default);
app.get('/ts-proxy.ts', ts_proxy_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
