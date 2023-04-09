import { createAPIInstance } from "./index.js";

const apiInstance = createAPIInstance();

async function postNFTID(bookId, nftId) {
  apiInstance
    .post("/book/token", {
      bookId: bookId,
      nftId: nftId,
    })
    .catch((err) => {
      console.log("err2");
    });
}

export { postNFTID };
