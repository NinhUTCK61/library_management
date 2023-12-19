import { Router } from "express";
import BookController from "../controllers/book.controller";
import { admin, user } from "../middlewares/authenticationToken.middlewares";

const bookController = new BookController();
class BookRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/book-index-user", user, bookController.indexForUser);
    this.router.get("/book-index-admin", admin, bookController.indexForAdmin);
    this.router.get("/book-getAll", user, bookController.getAllForUser);
  }
}

export default new BookRoutes();
