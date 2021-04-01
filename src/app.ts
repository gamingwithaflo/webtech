import express from "express";
import {SERVER_PORT} from "./config/env";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";

// TODO use import
const flash = require("express-flash");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/webtech.db");

// TODO
console.log("shit exists: ", fs.existsSync("./db/webtech.db"));

// router imports
import apiRouter from "./routes/api";
import pageRouter from "./routes/pages";

//IMPORTANT THIS IS JUST FOR TESTING PURPOSES NOT REAL DEAL
const users: {
    id: string;
    name: string;
    email: string;
    password: string;
}[] = [];

// express server
const app = express();
import StartupPassport from "./passport-configuration";
StartupPassport(passport);

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
app.use("/", pageRouter);

// TODO
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
        db.get(
            "select * from user where mail_address = ?",
            [req.body.email],
            (err: any, result: any) => {
                console.log("register user check");
                if (err) {
                    console.log(err);
                    res.redirect("register");
                } else if (typeof result == "undefined") {
                    // no user found (inside database);
                    console.log("register user not found");
                    db.run("INSERT INTO user VALUES (?, ?, ?, ?)", [
                        Math.floor(Math.random() * 1000000),
                        req.body.name,
                        req.body.email,
                        req.body.password,
                    ]); // user id is hier gewoon letterlijk een random getald
                    res.redirect("login");
                } else {
                    // user found (inside database);
                    console.log("register user found");
                    req.flash("error", "That email is already used");
                    res.redirect("register");
                }
            }
        );
    } catch {
        console.log("register errrrr");
        res.redirect("register");
    }
});

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
