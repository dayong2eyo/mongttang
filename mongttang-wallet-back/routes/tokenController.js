import express, { response } from "express";
import {
  buyMTT,
  sellMTT,
  getMTTBalance,
  getSSFBalance,
  approve,
  transferMTT,
  getAddress,
  deposit,
  transferSSF,
} from "../api/blockchain.js";
import { OWNER_PRIVATE_KEY, NFT_CONTRACT_ADDRESS } from "../config/index.js";
import { decrypt } from "../Service/Decryptor.js";
OWNER_PRIVATE_KEY;

const router = express.Router();

router.get("/mtt", (request, response) => {
  const query = request.query;
  const privateKey = decrypt(query.key);
  const address = getAddress(privateKey);
  const balance = getMTTBalance(address).then((res) => {
    response.send(res);
  });
});

router.get("/ssf", (request, response) => {
  const query = request.query;
  const privateKey = decrypt(query.key);
  const address = getAddress(privateKey);
  const balance = getSSFBalance(address).then((res) => {
    response.send(res);
  });
});

router.post("/ssf", (request, response) => {
  const body = request.body;
  const privateKey = decrypt(body.privateKey);
  transferSSF(privateKey, body.toAddress, body.amount).then((res) => {
    response.send(res);
  });
});

router.post("/buy", (request, response) => {
  const body = request.body;
  const privateKey = decrypt(body.privateKey);
  buyMTT(privateKey, body.amount).then((res) => {
    response.send(res);
  });
});

router.post("/sell", (request, response) => {
  const body = request.body;
  const privateKey = decrypt(body.privateKey);
  sellMTT(privateKey, body.amount).then((res) => {
    response.send(res);
  });
});

router.post("/read", (request, response) => {
  const body = request.body;
  const tokenId = body.tokenId;
  const amountToAuthor = body.amountToAuthor;
  const amountToManager = body.amountToManager;
  const privateKey = decrypt(body.privateKey);
  const managerAddress = getAddress(OWNER_PRIVATE_KEY);

  console.log("리드리드");
  console.log("amountToAuthor : " + amountToAuthor);
  console.log("amountToManager : " + amountToManager);
  console.log(" privateKey : " + privateKey);
  transferMTT(privateKey, managerAddress, amountToAuthor + amountToManager)
    .then(async () => {
      console.log("엠티티 전송중");
      await approve(OWNER_PRIVATE_KEY, NFT_CONTRACT_ADDRESS, amountToAuthor);
    })
    .then(async () => {
      console.log("디포짓 중");
      await deposit(OWNER_PRIVATE_KEY, tokenId, amountToAuthor);
    })
    .catch((error) => {
      console.log(error);
      response.statusCode = 500;
      response.end("Purchasing book failed. Error log : ", error);
    });
});

export default router;
