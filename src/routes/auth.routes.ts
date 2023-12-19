import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authController = new AuthController();
class AuthRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/login", authController.login);
    this.router.post("/logout", authController.logout);
    this.router.post("/register", authController.register);
  }
}

export default new AuthRoutes();
