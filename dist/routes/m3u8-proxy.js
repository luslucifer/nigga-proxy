"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = m3u8;
// import { BASE_PATH, userAgent } from "../../utils/utils";
const utils_1 = require("../utils/utils");
// import axios from "axios"; // Import axios
// export const runtime = "edge"
function m3u8(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const origin = req.headers.origin;
            console.log(utils_1.allowedOrigins);
            console.log(' nigga chod ');
            if (origin && utils_1.allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400');
            const url = req.query.url;
            let headers = { 'Referer': (url.includes('file2') ? 'https://megacloud.store/' : 'https://kerolaunochan.online/') };
            let h = headers;
            let u = new URL(headers.Referer || url);
            let GeneratedHeaders = {};
            GeneratedHeaders = h.Referer.includes('soaper') ? {} : GeneratedHeaders;
            // 's'.includes
            h = Object.assign({}, GeneratedHeaders, h);
            var hString = encodeURIComponent(JSON.stringify(h));
            console.log(headers);
            // res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=60, max-age=0');
            if (typeof url === 'string') {
                let rootArr = url.split('/');
                rootArr.pop();
                const root = rootArr.join('/');
                try {
                    // console.log(' mother ')
                    const r = yield fetch(url, { headers: h });
                    const data = yield r.text();
                    const headersObj = Object.fromEntries(r.headers.entries());
                    const splited = data.split('\n');
                    // console.log(splited)
                    headers = encodeURIComponent(headers);
                    for (let i = 0; i < splited.length; i++) { // Correct loop condition
                        const line = splited[i];
                        try {
                            if (line.includes('BANDWIDTH')) {
                                if (i + 1 < splited.length) { // Check bounds before accessing splited[i + 1]
                                    i = i + 1;
                                    const nextLine = splited[i];
                                    const mod = `${utils_1.BASE_PATH}/m3u8-proxy.m3u8?url=${encodeURIComponent((nextLine.includes('http') ? '' : root + '/') + nextLine)}&headers=${hString}`;
                                    splited[i] = mod; // Modify the next line
                                }
                            }
                            else if (line.includes('EXTINF')) {
                                if (i + 1 < splited.length) { // Check bounds before accessing splited[i + 1]
                                    i = i + 1;
                                    let nextLine = splited[i];
                                    const mod = `${utils_1.BASE_PATH}/ts-proxy.ts?url=${encodeURIComponent((nextLine.includes('http') ? '' : root + '/') + nextLine)}&headers=${hString}`;
                                    splited[i] = mod;
                                }
                            }
                        }
                        catch (error) {
                            console.log(`Error processing line ${i}: ${line}`, error);
                        }
                    }
                    const joined = splited.join('\n');
                    // console.log(joined)
                    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
                    // console.log(headersObj)
                    // res.header(headersObj)
                    res.status(200).send(joined);
                    // res.json(headersObj)
                    // res.send('mother fucker ')
                }
                catch (error) {
                    console.error("Error fetching the URL:", error);
                    res.status(500).json({ error: 'Failed to fetch the m3u8 URL' });
                }
            }
            else {
                res.status(400).json({ error: 'Invalid URL parameter' });
            }
        }
        catch (error) {
            const msg = ' m3u8 proxy broke ';
            console.error(error);
            res.send(error);
        }
    });
}
