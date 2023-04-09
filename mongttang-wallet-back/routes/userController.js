import express from "express";
import { getAddress } from "../api/blockchain.js";
import { decrypt } from "../Service/Decryptor.js";

const router = express.Router();

router.get("/", (request, response) => {
  const query = request.query;
  const privateKey = decrypt(query.key);
  const address = getAddress(privateKey);
  console.log(address);
  response.send(address);
});

export default router;
