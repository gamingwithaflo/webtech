/* eslint @typescript-eslint/no-var-requires: "off" */
const LocalStrategy = require("passport-local").Strategy;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/webtech.db");

function StartupPassport(passport: any, getUserById: any) {
  const identifyUser = (email: any, password: any, done: any) => {
    db.get("select * from user where mail_address = ? and password = ?", [email, password], (err: any, result: any) => {
      if(err) {
        console.log(err);
        return done(err);
      } else if (typeof result == 'undefined'){    // no user found (inside database);
        console.log("no find");
        return done(null, false, { message: "No user with that email or incorrect password" });
      } else {    // user found (inside database);
        console.log("yes find");
        console.info(result);
        return done(null, result);
      }
    });
  };

  const use = (serializeAfter: any) => {
    passport.use(new LocalStrategy({ usernameField: "email" }, identifyUser));
    serializeAfter(deserialize);
  }

  const serialize = (deserializeAfter: any) => {
    passport.serializeUser((user: any, done: any) => done(null, user.user_id));
    deserializeAfter();
  }

  const deserialize = () => {
    passport.deserializeUser((id: any, done: any) => {
      console.log(id);
      return done(null, getUserById(id));
    });
  }

  use(serialize);
  // because our default username is not equal to user we need to change that (but password default is allready good)

}

export default StartupPassport;
