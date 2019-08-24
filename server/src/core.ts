// Inital server setup
// ----------------------------------------------------------------------------
import * as express from "express";
import * as http from "http";
const app = express();
export const App = app;
const server = http.createServer(app);
export const Server = server;

// Utilities
// ----------------------------------------------------------------------------
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as logger from "morgan";
import * as fs from "fs";
import * as lusca from "lusca";
// import * as mongo from "connect-mongo";
import * as path from "path";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
// Mounts the session store with an auto loader into MongooseDB
// const MongoStore = require("connect-mongo")(session);
// Allows the session storage to be put into mongoose
// Starts the user account session
// app.use(passport.initialize());
// app.use(passport.session());
// Allows CORS
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// Pretty prints in console
app.use(errorHandler());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "./../../client/dist")));

// Prod vs Dev code and display
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
} else {
    app.locals.pretty = true;
}

// Setting up the routes for the rest of the application
import routes from "./controllers/routes";
app.use("/", routes);

// The last route run
import { Request, Response } from "express";
app.get("/**/", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./../../client/dist/index.html"));
});
