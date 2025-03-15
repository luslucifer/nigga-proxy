// import { BASE_PATH, userAgent } from "../../utils/utils";
import { BASE_PATH,userAgent,allowedOrigins } from "../utils/utils";
import type { Request, Response } from "express";
// import axios from "axios"; // Import axios

// export const runtime = "edge"

export default async function m3u8(req: Request, res: Response) {
    try {
        const origin = req.headers.origin
        console.log(allowedOrigins)
        console.log(' nigga chod ')

        if (origin && allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400');
        
        const url:any = req.query.url;
        let headers: any = {'Referer':(url.includes('file2')? 'https://megacloud.store/':'https://kerolaunochan.online/')};
        let h = headers;
        let u = new URL(headers.Referer || url);
        let GeneratedHeaders :any= {};
        GeneratedHeaders = h.Referer.includes('soaper') ? {} : GeneratedHeaders
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
                const r = await fetch(url, { headers: h });
                const data = await  r.text();
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
                                const mod = `${BASE_PATH}/m3u8-proxy.m3u8?url=${encodeURIComponent((nextLine.includes('http') ? '' : root + '/') + nextLine)}&headers=${hString}`;
                                splited[i] = mod; // Modify the next line
                            }
                        } else if (line.includes('EXTINF')) {
                            if (i + 1 < splited.length) { // Check bounds before accessing splited[i + 1]
                                i = i + 1;
                                let nextLine = splited[i];
                                const mod = `${BASE_PATH}/ts-proxy.ts?url=${encodeURIComponent((nextLine.includes('http') ? '' : root + '/') + nextLine)}&headers=${hString}`;
                                splited[i] = mod;
                            }
                        }
                    } catch (error) {
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
            } catch (error) {
                console.error("Error fetching the URL:", error);
                res.status(500).json({ error: 'Failed to fetch the m3u8 URL' });
            }
        } else {
            res.status(400).json({ error: 'Invalid URL parameter' });
        }
    } catch (error) {
        const msg = ' m3u8 proxy broke '
        console.error(error)
        res.send(error)
    }
    }
