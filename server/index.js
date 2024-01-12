// Verify environment credentials for MongoDB
if (!process.env.MONGODB_SECRET_USER) {
    require("dotenv").config({ path: "SECRET.env" });
}
if (!process.env.MONGODB_SECRET_USER) {
    console.error("Unable to find MongoDB credentials from SECRET.env");
    process.exit(-1);
}

const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Database: DB } = require("./database/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const allowedOrigins = [
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
];

// Run backend server
async function run() {
    console.log("Starting DB");

    await DB.init();
    const app = express();

    //Middlewware
    app.use(
        cors({
            origin: (origin, callback) => {
                if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error(`${origin} is not allowed by CORS`));
                }
            },
            credentials: true,
            optionsSuccessStatus: 200,
        })
    );
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));

    app.use("/", require("./routes/studentRoutes"));
    app.use("/", require("./routes/userRoutes"));
    app.use("/", require("./routes/commentRoutes"));
    app.use("/", require("./routes/orgRoutes"));

    const port = 8000;
    app.listen(port, () => {
        console.log("Server is running on 8000");
    });
    console.log("Running");
}

run();
