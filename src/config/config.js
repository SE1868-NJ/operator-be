import dotenv from "dotenv";
dotenv.config();

// DB config

export const DATABASE = process.env.DATABASE || "operator";
export const USERNAME = process.env.USERNAME || "root";
export const PASSWORD = process.env.PASSWORD || "";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DBHOST || "localhost";
export const EMAIL_NAME = process.env.EMAIL_NAME;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
