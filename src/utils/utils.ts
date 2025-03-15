import * as dotenv from 'dotenv'
dotenv.config()
export const BASE_PATH = process.env.SERVER_BASE_PATH || ``
export const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
export const allowedOrigins = process.env.WHITELIST_DOMAINS?.split(',') || ['*']