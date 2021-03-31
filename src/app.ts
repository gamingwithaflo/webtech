/* eslint @typescript-eslint/no-var-requires: "off" */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
const flash = require("express-flash");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/webtech.db");
console.log("shit exists: ", fs.existsSync("./db/webtech.db"));

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
StartupPassport(passport);

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
app.get("/profile", checkIfLoggedIn, (req: any, res, any) => {
  res.render("pages/profile", { name: req.user.name });
});
app.post("/logout", (req: any, res: any) => {
  //passport set this up for us to use automaticly
  console.log("is the right thing called");
  req.logout();
  res.redirect("login");
});
app.get("/login", checkIfNotLoggedIn, (req: any, res: any) => {
  res.render("pages/login");
});
app.get("/register", checkIfNotLoggedIn, (req: any, res: any) => {
  res.render("pages/register");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "profile",
    failureRedirect: "login",
    failureFlash: true,
  })
);
app.post("/register", (req: any, res: any) => {
  //normally we need to push this to the database

  /* WHY THE TRY CATCH HERE?!?!?!?! */

  try {
    db.get("select * from user where mail_address = ?", [req.body.email], (err: any, result: any) => {
      console.log("register user check");
      if(err) {
        console.log(err);
        res.redirect("register");
      } else if (typeof result == 'undefined'){    // no user found (inside database);
        console.log("register user not found");
        db.run("INSERT INTO user VALUES (?, ?, ?, ?)",
          [Math.floor(Math.random() * 1000000), req.body.name, req.body.email, req.body.password],
          (err: any) => {
            console.log("error is: " + err)
          }); // user id is hier gewoon letterlijk een random getald
        res.redirect("login");
      } else {    // user found (inside database);
        console.log("register user found");
        req.flash("error", "That email is already used");
        res.redirect("register");
      }
    });
  } catch {
    console.log("register errrrr");
    res.redirect("register");
  }
});
// TODO api
app.get("/topics", topicController.getTopics);

//protects the informations from being accessable if you are not logged in
function checkIfLoggedIn(req: any, res: any, next: any) {
  //function from passport which checks if you are logged in.
  if (req.isAuthenticated()) {
    //user is logged in and everything is right.
    return next();
  } else {
    // if you are not logged in you will be redirected.
    res.redirect("login");
  }
}
//if you al already logged in you are not allowed to use these files/recources
function checkIfNotLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    res.redirect("profile");
  } else {
    return next();
  }
}

export default app;
