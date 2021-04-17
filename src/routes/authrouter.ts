import express from "express";
import BaseRouter from "./baserouter";
import AuthController from "../controllers/authcontroller";
import PassportConfig from "../config/passportconfig";

export default class AuthRouter implements BaseRouter {
  private authController;

  constructor() {
    this.authController = new AuthController();
  }

  /*
   * get router
   * @return express router
   */
  getRouter() {
    const authRouter = express.Router();
    authRouter.get("/login", PassportConfig.isNotAuthenticated, (req, res) =>
      this.authController.login(req, res)
    );
    authRouter.get("/register", PassportConfig.isNotAuthenticated, (req, res) =>
      this.authController.register(req, res)
    );
    authRouter.post("/login", (req, res, next) =>
      this.authController.postLogin(req, res, next)
    );
    authRouter.post("/register", (req, res, next) =>
      this.authController.postRegister(req, res, next)
    );
    authRouter.post("/logout", (req, res) =>
      this.authController.logout(req, res)
    );
    authRouter.get("/change_name", PassportConfig.isAuthenticated, (req, res) =>
      this.authController.change_name(req, res)
    );
    authRouter.get(
      "/change_email",
      PassportConfig.isAuthenticated,
      (req, res) => this.authController.change_email(req, res)
    );
    authRouter.get("/report", PassportConfig.isAuthenticated, (req, res) =>
      this.authController.report(req, res)
    );
    authRouter.post(
      "/changed_email",
      PassportConfig.isAuthenticated,
      (req, res, next) => this.authController.changed_email(req, res, next)
    );
    authRouter.post(
      "/changed_name",
      PassportConfig.isAuthenticated,
      (req, res, next) => this.authController.changed_name(req, res, next)
    );
    return authRouter;
  }
}
