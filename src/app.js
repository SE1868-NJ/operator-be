// config .ENV
require("dotenv").config({ path: "./.env" });

const PORT = 3000;

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// setup terminal logger
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    database: "db",
});

db.connect();

app.get("/", (req, res) => {
    db.query("create table dba(id int)");
    res.json({
        message: "hello",
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can not start", err);
    }
});
