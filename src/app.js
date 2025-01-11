// config .ENV

const PORT = 3000;
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import db from "./config/sequelize.config.js";
import { User } from "./models/user.model.js";
import route from "./routes/index.js";

const app = express();

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// setup terminal logger
// app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// get all users
app.get("/select", (req, res) => {
    User.findAll({
        where: { firstName: "Kira" },
    })
        .then((users) => {
            res.status(500).json({
                users,
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "ERR",
            });
        });
});

/* Create new user record */
// app.get("/insert", (req, res) => {
//     User.create({
//         firstName: "Kira",
//         age: 20
//     }).catch(err => {
//         if (err) {
//             console.error(err)
//         }
//     })
// })

// check db connection
try {
    await db.authenticate();
} catch (error) {
    console.error("ERR: ", error);
}

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can not start", err);
    }
});

route(app);
