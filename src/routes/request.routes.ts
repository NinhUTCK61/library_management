import { Router } from "express";
import RequestController from "../controllers/request.controller";
import { admin, user } from "../middlewares/authenticationToken.middlewares";

const requestController = new RequestController();
class requestRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/request-create", user, requestController.create);
    this.router.post(
      "/request-create-detail",
      user,
      requestController.createDetail
    );
    this.router.get(
      "/request-index-user",
      user,
      requestController.indexForUser
    );
    this.router.get(
      "/request-index-admin",
      admin,
      requestController.indexForAdmin
    );
    this.router.get("/request-getAll", user, requestController.getAllRequest);
  }
}

export default new requestRoutes();
