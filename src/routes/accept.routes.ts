import { Router } from "express";
import AcceptController from "../controllers/accept.controller";
import { admin, user } from "../middlewares/authenticationToken.middlewares";

const acceptController = new AcceptController();
class acceptRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.patch("/accept-update", admin, acceptController.update);
  }
}

export default new acceptRoutes();
