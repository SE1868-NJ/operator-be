import dotenv from "dotenv";
dotenv.config();

// DB config
export const DATABASE = process.env.DATABASE || "operator";
export const USERNAME = "root" || "root";
export const PASSWORD = process.env.PASSWORD || "spring";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DBHOST || "localhost";
