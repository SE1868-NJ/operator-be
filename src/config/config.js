import dotenv from "dotenv";
dotenv.config();

// DB config
export const DATABASE = process.env.DATABASE || "operator";
export const USERNAME = process.env.USERNAME || "root";
export const PASSWORD = process.env.PASSWORD || "";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DBHOST || "localhost";
