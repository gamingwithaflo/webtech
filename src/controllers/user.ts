import passport from "passport";
import app from "../app";
import sqlite3 from "sqlite3";
import fs from "fs";
import {Request, Response} from "express";

// error on code below, uncomment when fixed

// const db = new sqlite3.Database("./db/webtech.db");
//
// // TODO
// console.log("shit exists: ", fs.existsSync("./db/webtech.db"));
//
// // TODO /models/user
// //IMPORTANT THIS IS JUST FOR TESTING PURPOSES NOT REAL DEAL
// const users: {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
// }[] = [];
//
// // TODO add comments
//
// app.get("/profile", checkIfLoggedIn, (req: any, res, any) => {
//     res.render("pages/profile", { name: req.user.name });
// });
// app.post("/logout", (req: any, res: any) => {
//     //passport set this up for us to use automaticly
//     console.log("is the right thing called");
//     req.logout();
//     res.redirect("login");
// });
// app.get("/login", checkIfNotLoggedIn, (req: any, res: any) => {
//     res.render("pages/login");
// });
// app.get("/register", checkIfNotLoggedIn, (req: any, res: any) => {
//     res.render("pages/register");
// });
// app.post(
//     "/login",
//     passport.authenticate("local", {
//         successRedirect: "profile",
//         failureRedirect: "login",
//         failureFlash: true,
//     })
// );
// app.post("/register", (req: any, res: any) => {
//     //normally we need to push this to the database
//
//     /* WHY THE TRY CATCH HERE?!?!?!?! */
//
//     try {
//         db.get(
//             "select * from user where mail_address = ?",
//             [req.body.email],
//             (err: any, result: any) => {
//                 console.log("register user check");
//                 if (err) {
//                     console.log(err);
//                     res.redirect("register");
//                 } else if (typeof result == "undefined") {
//                     // no user found (inside database);
//                     console.log("register user not found");
//                     db.run("INSERT INTO user VALUES (?, ?, ?, ?)", [
//                         Math.floor(Math.random() * 1000000),
//                         req.body.name,
//                         req.body.email,
//                         req.body.password,
//                     ]); // user id is hier gewoon letterlijk een random getald
//                     res.redirect("login");
//                 } else {
//                     // user found (inside database);
//                     console.log("register user found");
//                     req.flash("error", "That email is already used");
//                     res.redirect("register");
//                 }
//             }
//         );
//     } catch {
//         console.log("register errrrr");
//         res.redirect("register");
//     }
// });
//
// //protects the informations from being accessable if you are not logged in
// function checkIfLoggedIn(req: any, res: any, next: any) {
//     //function from passport which checks if you are logged in.
//     if (req.isAuthenticated()) {
//         //user is logged in and everything is right.
//         return next();
//     } else {
//         // if you are not logged in you will be redirected.
//         res.redirect("login");
//     }
// }
// //if you al already logged in you are not allowed to use these files/recources
// function checkIfNotLoggedIn(req: any, res: any, next: any) {
//     if (req.isAuthenticated()) {
//         res.redirect("profile");
//     } else {
//         return next();
//     }
// }

// TODO
export const login = (req: Request, res: Response) => {
    res.render("pages/login");
};

export const register = (req: Request, res: Response) => {
    res.render("pages/register");
};

export const profile = (req: Request, res: Response) => {
    res.render("pages/profile");
};
