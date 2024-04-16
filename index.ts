import cors from "cors";
import express from "express";
import router from "./apis/routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.listen(PORT, () => console.log("server has started"));
app.use("/api/user", router);
app.use(errorHandler);
