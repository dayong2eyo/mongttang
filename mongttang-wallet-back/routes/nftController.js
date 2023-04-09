import express from "express";
import {
  withdraw,
  makeNFT,
  getAddress,
  getNFTList,
  getNFTURI,
} from "../api/blockchain.js";
import { postNFTID } from "../api/spring.js";
import { create } from "ipfs-http-client";
import multer from "multer";
import { decrypt } from "../Service/Decryptor.js";

// Node 에서는 require 이 뒤에 .js 를 붙이지 않아도 된다.

const router = express.Router();

router.get("/", (request, response) => {
  const query = request.query;
  getNFTList(query.address)
    .then((res) => {
      const json = {
        nftIds: res[0],
        nftBalances: res[1],
        nftTotalEarneds: res[2],
      };
      response.send(json);
    })
    .catch(console.error);
});

router.get("/uri", (request, response) => {
  const query = request.query;
  getNFTURI(query.tokenId)
    .then((res) => {
      console.log(res);
      response.send(res);
    })
    .catch(console.error);
});

const ipfs = create({
  host: "j8a308.p.ssafy.io",
  port: 5001,
  protocol: "http",
});
const upload = multer();

router.post("/ipfs", upload.array("images", 20), async (request, response) => {
  try {
    // Extract the image data from the request
    const imageData = request.files.map((file) => file.buffer);
    const body = request.body;

    // Add the received image data to IPFS and get their CIDs
    console.log("업로드 시도중");
    console.log(body.privateKey);
    const cidPromises = imageData.map((data) => ipfs.add(data));
    const cids = await Promise.all(cidPromises);
    const cidStrings = cids.map((cid) => cid.cid.toString());
    console.log(`Images added to IPFS with CIDs ${cidStrings}`);

    const metadata = {
      name: `${body.title}`,
      image: `https://ipfs.io/ipfs/${cidStrings[0]}`,
      description: `${body.summary}`,
      attributes: [],
    };

    for (let i = 0; i < cidStrings.length; i++) {
      metadata.attributes.push({
        trait_type: `page : ${i + 1}`,
        image: `https://ipfs.io/ipfs/${cidStrings[i]}`,
      });
    }

    const jsonString = JSON.stringify(metadata);
    const jsonBuffer = Buffer.from(jsonString);
    const metadataCid = await ipfs.add(jsonBuffer);

    const address = getAddress(decrypt(body.privateKey));
    console.log(address);
    const nftId = await makeNFT(
      address,
      `https://ipfs.io/ipfs/${metadataCid.path}`
    );
    console.log("bookId : " + body.bookId + " nftId : " + nftId);
    await postNFTID(body.bookId, nftId);

    // Return the CIDs as a response to the client
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write(JSON.stringify(metadataCid) + ",");
    response.end(cidStrings.join(","));
  } catch (error) {
    console.error("Error adding images to IPFS:", error);
    response.statusCode = 500;
    response.end("Error adding images to IPFS");
  }
});

router.post("/withdraw", (request, response) => {
  const body = request.body;
  console.log(request);
  const privateKey = decrypt(body.privateKey);
  withdraw(privateKey, body.tokenId, body.amount).then((res) => {
    response.send(res);
  });
});

export default router;
