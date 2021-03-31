/* eslint @typescript-eslint/no-var-requires: "off" */
const LocalStratagy = require("passport-local").Strategy;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/webtech.db");

function StartupPassport(passport: any, getUserById: any) {
  const identifyUser = (email: any, password: any, done: any) => {
    db.get("select * from user where mail_address = ? and password = ?", [email, password], (err: any, result: any) => {
      if(err) {
        console.log(err);
      } else if (typeof result == 'undefined'){    // no user found (inside database);
        done(null, false, { message: "No user with that email or incorrect password" });
      } else {    // user found (inside database);
        done(null, result);
      }
    });
  };
  // because our default username is not equal to user we need to change that (but password default is allready good)
  passport.use(new LocalStratagy({ usernameField: "email" }, identifyUser));
  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser((id: any, done: any) => {
    return done(null, getUserById(id));
  });
}

export default StartupPassport;
