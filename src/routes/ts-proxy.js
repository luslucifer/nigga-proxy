"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.default = TsProxy;
const https = __importStar(require("https"));
// export const runtime = "edge"
// Define the function for handling the API request
function TsProxy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the URL from the query parameter and ensure it's a string
            const url = req.query.url;
            // Get the headers from the query or default to an empty object
            const headers = req.query.headers ? JSON.parse(req.query.headers) : {};
            // res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=60, max-age=0');
            // Ensure that the URL is provided
            if (!url) {
                return res.status(400).json({ error: 'URL parameter is required' });
            }
            // Set up options for the HTTPS request, including headers
            // console.log(headers)
            const options = {
                headers,
            };
            // Make the HTTPS request
            https.get(url, options, (response) => {
                // Forward the response status code from the external server
                res.status(response.statusCode || 200);
                // Forward all headers from the external response to the client
                Object.keys(response.headers).forEach((key) => {
                    res.setHeader(key, `${response.headers[key]}`);
                });
                // Pipe the external response body to the client
                response.pipe(res);
            }).on('error', (error) => {
                // Handle any errors in the HTTPS request
                console.error('Error in HTTPS request:', error);
                res.status(500).json({ error: 'Failed to fetch the resource' });
            });
        }
        catch (error) {
            const msg = ' ts proxy boke ';
            console.error(msg);
            console.error(error);
            res.send(error);
        }
    });
}
