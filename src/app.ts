import express from "express";
import {SERVER_PORT} from "./config/env";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import StartupPassport from "./config/passport";
import flash from "express-flash";

// router imports
import apiRouter from "./routes/api";
import clientRouter from "./routes/client";

// express server
const app = express();
// StartupPassport(passport);

// express configuration
app.set("port", SERVER_PORT);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        saveUninitialized: false,
        resave: false,
    })
);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// routers
app.use("/api", apiRouter);
app.use("/", clientRouter);

export default app;
