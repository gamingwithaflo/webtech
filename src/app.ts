/* eslint @typescript-eslint/no-var-requires: "off" */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
const flash = require("express-flash");
// controllers
import * as topicController from "./controllers/topic";

// set environment variables
if (fs.existsSync(".env")) {
  //TODO logger
  console.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}
//IMPORTANT THIS IS JUST FOR TESTING PURPOSES NOT REAL DEAL
const users: {
  id: string;
  name: string;
  email: string;
  password: string;
}[] = [];
// create express server
const app = express();
import StartupPassport from "./passport-configuration";
StartupPassport(
  passport,
  (email: any) => users.find((user) => user.email === email),
  (id: any) => users.find((user) => user.id === id)
);

// express configuration
app.set("port", process.env.PORT || 8080);
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

// TODO controllers
// routes
app.get("/", (req: any, res: any) => {
  res.render("pages/index", {
    title: "React",
    header: "Hello world!",
  });
});
app.get("/what-is-react", (req: any, res: any) => {
  res.render("pages/what-is-react");
});
app.get("/getting-started", (req: any, res: any) => {
  res.render("pages/getting-started");
});
app.get("/notable-features", (req: any, res: any) => {
  res.render("pages/notable-features");
});
app.get("/history", (req: any, res: any) => {
  res.render("pages/history");
});
app.get("/assessment", (req: any, res: any) => {
  res.render("pages/assessment");
});
app.get("/login", (req: any, res: any) => {
  res.render("pages/login");
});
app.get("/register", (req: any, res: any) => {
  res.render("pages/register");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "assessment",
    failureRedirect: "login",
    failureFlash: true,
  })
);
app.post("/register", (req: any, res: any) => {
  //normally we need to push this to the database
  try {
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.info(users);
    res.redirect("login");
  } catch {
    res.redirect("register");
  }
});
// TODO api
app.get("/topics", topicController.getTopics);

export default app;
