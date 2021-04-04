import passport from "passport";
import passportLocal from "passport-local";
import sqlite3 from "sqlite3";
import { Request, Response, NextFunction } from "express";
import * as env from "./env";

const LocalStrategy = passportLocal.Strategy;
const initiate = sqlite3.verbose();
const db = new initiate.Database(env.DB_LOCATION);

const identifyUser = (email: any, password: any, done: any) => {
  db.get(
    "select * from user where mail_address = ? and password = ?",
    [email, password],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
        return done(err);
      } else if (typeof result == "undefined") {
        // no user found (inside database);
        console.log("no find");
        return done(null, false, {
          message: "No user with that email or incorrect password",
        });
      } else {
        // user found (inside database);
        console.log("yes find");
        console.info(result);
        return done(null, result);
      }
    }
  );
};

passport.use(new LocalStrategy({ usernameField: "email" }, identifyUser));
passport.serializeUser((user: any, done: any) => done(null, user.user_id));
// because our default username is not equal to user we need to change that (but password default is allready good)
passport.deserializeUser((id: any, done: any) => {
  console.log(id);
  db.get(
    "select * from user where user_id = ?",
    [id],
    (err: any, result: any) => {
      if (err) {
        console.log(err);
        return done(err);
      } else if (typeof result == "undefined") {
        return done(null, false, { message: "No user with that id" });
      } else {
        return done(null, result);
      }
    }
  );
});

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

export const checkNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
};
