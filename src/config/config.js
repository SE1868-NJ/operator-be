import dotenv from "dotenv";
dotenv.config();

// DB config

export const DATABASE = "operator";
export const USERNAME = "root";
export const PASSWORD = "";
export const DIALECT = process.env.DIALECT || "mysql";
export const DBHOST = process.env.DBHOST || "localhost";
