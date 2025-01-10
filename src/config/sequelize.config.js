import { Sequelize } from "sequelize";
import { DATABASE, PASSWORD, USERNAME } from "./config.js";

const db = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});

export default db;
