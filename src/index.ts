import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import requestRoutes from "./routes/request.routes";
import acceptRoutes from "./routes/accept.routes";

const app = express();

dotenv.config();
app.use(express.json());

app.use(cors());
app.use(morgan("combined"));

app.use("/qltv/api/v1", authRoutes.router);
app.use("/qltv/api/v1", bookRoutes.router);
app.use("/qltv/api/v1", requestRoutes.router);
app.use("/qltv/api/v1", acceptRoutes.router);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
