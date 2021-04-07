import express from "express";
import * as env from "./config/env";
import path from "path";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import flash from "express-flash";

// router imports
import apiRouter from "./routes/api";
import clientRouter from "./routes/client";

// express server
const app = express();

// express configuration
app.set("port", env.SERVER_PORT);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// TODO
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// routers
app.use("/api", apiRouter);
app.use("/", clientRouter);

export default app;
