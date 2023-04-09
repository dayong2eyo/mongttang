import express from "express";
import nftController from "./routes/nftController.js";
import cors from "cors";
import bodyParser from "body-parser";
import tokenController from "./routes/tokenController.js";
import userController from "./routes/userController.js";
const app = express();

process.on("uncaughtException", function (error) {
  console.log("error");
});
app.use(cors());
app.use(bodyParser.json());
app.use("/nft", nftController);
app.use("/token", tokenController);
app.use("/user", userController);

app.listen(4000);
