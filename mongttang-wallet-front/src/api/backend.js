import { createAPIInstance } from ".";

const apiInstance = createAPIInstance();

function getNFTList(address) {
  return apiInstance.get(`/nft?address=${address}`);
}

function getNFTURI(tokenId){
  return apiInstance.get(`/nft/uri?tokenId=${tokenId}`);
}

function getAddress(privateKey) {
  const uriEncoded = encodeURIComponent(privateKey);
  return apiInstance.get(`/user?key=${uriEncoded}`);
}

async function withdraw(privateKey, tokenId, amount) {
  const result = await apiInstance.post("/nft/withdraw", {
    privateKey: privateKey,
    tokenId: tokenId,
    amount: amount,
  });

  return result.data
}

async function buyMTT(privateKey, amount) {
  const result = await apiInstance.post("/token/buy", {
    privateKey: privateKey,
    amount: amount,
  });

  return result.data;
}

async function sellMTT(privateKey, amount) {
  const result = await apiInstance.post("/token/sell", {
    privateKey: privateKey,
    amount: amount,
  });

  return result.data;
}

function getMTTBalance(privateKey) {
  const uriEncoded = encodeURIComponent(privateKey);
  return apiInstance.get(`/token/mtt?key=${uriEncoded}`);
}

function getSSFBalance(privateKey) {
  const uriEncoded = encodeURIComponent(privateKey);
  return apiInstance.get(`/token/ssf?key=${uriEncoded}`);
}

async function transferSSF(privateKey, toAddress, amount) {
  const result = await apiInstance.post("/token/ssf", {
    privateKey: privateKey,
    toAddress: toAddress,
    amount: amount,
  });

  return result.data;
}
export {
  getNFTList,
  getNFTURI,
  withdraw,
  buyMTT,
  sellMTT,
  getAddress,
  getMTTBalance,
  getSSFBalance,
  transferSSF,
};
