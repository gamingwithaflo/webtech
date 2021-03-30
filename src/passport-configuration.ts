/* eslint @typescript-eslint/no-var-requires: "off" */
const LocalStratagy = require("passport-local").Strategy;

function StartupPassport(passport: any, getUserByEmail: any, getUserById: any) {
  const identifyUser = (email: any, password: any, done: any) => {
    const user = getUserByEmail(email);
    //no user found (inside database);
    if (user == null) {
      // function you need to call everytime you are at an  end: done (error, userWeFound, Message which will be displayed)
      return done(null, false, { message: "No user with that email" });
    } else {
      try {
        if (password === user.password) {
          return done(null, user);
        } else {
          return done(null, false, { message: "passport incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    }
  };
  // because our default username is not equal to user we need to change that (but password default is allready good)
  passport.use(new LocalStratagy({ usernameField: "email" }, identifyUser));
  passport.serializeUser((user: any, done: any) => done(null, user.id));
  passport.deserializeUser((id: any, done: any) => {
    return done(null, getUserById(id));
  });
}

export default StartupPassport;
