import passport from "passport";
import sqlite3 from "sqlite3";
import { Request, Response, NextFunction } from "express";
import * as env from "../config/env";

const db = new sqlite3.Database(env.DB_LOCATION);

// TODO
export const login = (req: Request, res: Response) => {
  res.render("pages/login");
};

export const register = (req: Request, res: Response) => {
  res.render("pages/register");
};

export const profile = (req: Request, res: Response) => {
  res.render("pages/profile", { email: req.user.email });
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  })(req, res, next);
};

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO
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
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};
