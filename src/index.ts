import express, { Request, Response } from "express";
import m3u8 from "./routes/m3u8-proxy";
import TsProxy from "./routes/ts-proxy";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/m3u8-proxy.m3u8",m3u8)
app.get('/ts-proxy.ts',TsProxy)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
