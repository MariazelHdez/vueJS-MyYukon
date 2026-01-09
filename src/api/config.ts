import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

const nodeEnv = process.env.NODE_ENV;
const envCandidates: string[] = [];

switch (nodeEnv) {
  case "test":
    envCandidates.push(".env.test");
    break;
  case "production":
    envCandidates.push(".env.production");
    break;
  case "development":
    envCandidates.push(".env.development");
    break;
  default:
    if (nodeEnv) {
      envCandidates.push(`.env.${nodeEnv}`);
    }
    envCandidates.push(".env.development");
}

envCandidates.push(".env");

const envPath = envCandidates
  .map((candidate) => path.resolve(process.cwd(), candidate))
  .find((candidate) => fs.existsSync(candidate));

if (envPath) {
  dotenv.config({ path: envPath });
}

export const API_PORT = parseInt(process.env.API_PORT || "3000");
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";
export const AUTH_REDIRECT =
  process.env.AUTH_REDIRECT ||
  process.env.VIVVO_CALLBACK_URL ||
  process.env.FRONTEND_URL ||
  "http://localhost:8080";
export const NODE_ENV = process.env.NODE_ENV;

export const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  process.env.SECRET ||
  process.env.VIVVO_CLIENT_SECRET ||
  "";
export const AUTH_CLIENT_ID =
  process.env.AUTH_CLIENT_ID || process.env.CLIENT_ID || process.env.VIVVO_CLIENT_ID || "";
export const AUTH_ISSUER_BASE_URL =
  process.env.AUTH_ISSUER_BASE_URL || process.env.ISSUER_BASE_URL || "";
export const AUTH_BASE_URL =
  process.env.AUTH_BASE_URL || process.env.BASE_URL || `http://localhost:${API_PORT}`;

export const DB_NAME = process.env.DB_NAME || "postgres";
export const DB_USER = process.env.DB_USER || "postgres";
export const DB_PASS = process.env.DB_PASS || "password";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "5432";
