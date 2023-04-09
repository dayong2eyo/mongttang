import { createRPCInstance } from "./index.js";
import {
  NFT_CONTRACT_ADDRESS,
  MTT_CONTRACT_ADDRESS,
  SSF_CONTRACT_ADDRESS,
  OWNER_PRIVATE_KEY,
} from "../config/index.js";
import {
  ERC20_CONTRACT_ABI,
  NFT_CONTRACT_ABI,
  MTT_CONTRACT_ABI,
} from "../config/ABIs.js";

const rpcInstance = createRPCInstance();

const mttContract = new rpcInstance.eth.Contract(
  MTT_CONTRACT_ABI,
  MTT_CONTRACT_ADDRESS
);

const ssfContract = new rpcInstance.eth.Contract(
  ERC20_CONTRACT_ABI,
  SSF_CONTRACT_ADDRESS
);

const nftContract = new rpcInstance.eth.Contract(
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS
);

async function getMTTBalance(accountAddress) {
  let balance;
  try {
    balance = await mttContract.methods.balanceOf(accountAddress).call();
    console.log("mtt: " + balance);
  } catch (error) {
    console.error(error);
  }

  return balance;
}

async function getSSFBalance(accountAddress) {
  let balance;
  try {
    balance = await ssfContract.methods.balanceOf(accountAddress).call();
    console.log("ssf: " + balance);
  } catch (error) {
    console.error(error);
  }

  return balance;
}

async function getNFTList(accountAddress) {
  let nfts;
  try {
    nfts = await nftContract.methods.getNfts(accountAddress).call();
    console.log(nfts);
    return nfts;
  } catch (error) {
    console.error(error);
  }
}

async function getNFTURI(tokenId) {
  let URI;
  try {
    URI = await nftContract.methods.tokenURI(tokenId).call();
    return URI;
  } catch (error) {
    console.error(error);
  }
}

async function makeNFT(toAddress, tokenURI) {
  const ownerAccount =
    rpcInstance.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
  let nftIdHex;
  await rpcInstance.eth
    .getTransactionCount(ownerAccount.address)
    .then(async (nonce) => {
      const functionAbi = nftContract.methods
        .create(toAddress, tokenURI)
        .encodeABI();
      const gasPrice = 0;
      const gasLimit = 210000;
      const transactionObject = {
        nonce: rpcInstance.utils.toHex(nonce),
        gasPrice: rpcInstance.utils.toHex(gasPrice),
        gas: rpcInstance.utils.toHex(gasLimit),
        to: NFT_CONTRACT_ADDRESS,
        from: ownerAccount.address,
        data: functionAbi,
      };

      const signedTx = await rpcInstance.eth.accounts.signTransaction(
        transactionObject,
        OWNER_PRIVATE_KEY
      );
      console.log(signedTx);
      await rpcInstance.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .on("receipt", (receipt) => {
          console.log(`Transaction confirmed: ${receipt.transactionHash}`);
          console.log(`Gas used: ${receipt.gasUsed}`);
          nftIdHex = receipt.logs[1].data;
        })
        .on("error", (error) => {
          console.error(`Transaction error: ${error}`);
        });
    });
  const nftId = parseInt(nftIdHex);
  return nftId;
}

async function buyMTT(userPrivateKey, amount) {
  console.log("buyMTT amount : " + amount);
  try {
    const ownerAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
    const userAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(userPrivateKey);
    const res1 = await transferSSF(
      userPrivateKey,
      ownerAccount.address,
      amount / 100
    );
    if (res1) {
      const res2 = await transferMTT(
        OWNER_PRIVATE_KEY,
        userAccount.address,
        amount
      );
      if (!res2) {
        await transferSSF(OWNER_PRIVATE_KEY, userAccount.address, amount / 100);
      }
    }
    return true;
  } catch (err) {
    console.log;
    return false;
  }
}

async function sellMTT(userPrivateKey, amount) {
  console.log("sellMTT amount : " + amount);
  try {
    const ownerAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(OWNER_PRIVATE_KEY);
    const userAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(userPrivateKey);
    const res1 = await transferMTT(
      userPrivateKey,
      ownerAccount.address,
      amount
    );
    if (res1) {
      const res2 = await transferSSF(
        OWNER_PRIVATE_KEY,
        userAccount.address,
        amount / 100
      );
      if (!res2) {
        await transferMTT(OWNER_PRIVATE_KEY, userAccount.address, amount);
      }
    }
    return true;
  } catch (err) {
    console.log;
    return false;
  }
}

async function transferMTT(fromPrivateKey, toAddress, amount) {
  try {
    const fromAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(fromPrivateKey);
    const nonce = await rpcInstance.eth.getTransactionCount(
      fromAccount.address
    );
    const functionAbi = mttContract.methods
      .transfer(toAddress, amount)
      .encodeABI();
    const gasPrice = 0;
    const gasLimit = 210000;
    const transactionObject = {
      nonce: rpcInstance.utils.toHex(nonce),
      gasPrice: rpcInstance.utils.toHex(gasPrice),
      gas: rpcInstance.utils.toHex(gasLimit),
      to: MTT_CONTRACT_ADDRESS,
      from: fromAccount.address,
      data: functionAbi,
    };

    const signedTx = await rpcInstance.eth.accounts.signTransaction(
      transactionObject,
      fromPrivateKey
    );
    const receipt = await rpcInstance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    return true;
  } catch (error) {
    console.error(`Transaction error: ${error}`);
    return false;
  }
}

async function transferSSF(fromPrivateKey, toAddress, amount) {
  try {
    const fromAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(fromPrivateKey);
    const nonce = await rpcInstance.eth.getTransactionCount(
      fromAccount.address
    );
    const functionAbi = ssfContract.methods
      .transfer(toAddress, amount)
      .encodeABI();
    const gasPrice = 0;
    const gasLimit = 210000;
    const transactionObject = {
      nonce: rpcInstance.utils.toHex(nonce),
      gasPrice: rpcInstance.utils.toHex(gasPrice),
      gas: rpcInstance.utils.toHex(gasLimit),
      to: SSF_CONTRACT_ADDRESS,
      from: fromAccount.address,
      data: functionAbi,
    };
    const signedTx = await rpcInstance.eth.accounts.signTransaction(
      transactionObject,
      fromPrivateKey
    );
    const receipt = await rpcInstance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    return true;
  } catch (error) {
    console.error(`Transaction error: ${error}`);
    return false;
  }
}

async function withdraw(userPrivateKey, tokenId, amount) {
  try {
    const userAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(userPrivateKey);
    const nonce = await rpcInstance.eth.getTransactionCount(
      userAccount.address
    );
    const functionAbi = nftContract.methods
      .withdraw(tokenId, amount)
      .encodeABI();
    const gasPrice = 0;
    const gasLimit = 210000;
    const transactionObject = {
      nonce: rpcInstance.utils.toHex(nonce),
      gasPrice: rpcInstance.utils.toHex(gasPrice),
      gas: rpcInstance.utils.toHex(gasLimit),
      to: NFT_CONTRACT_ADDRESS,
      from: userAccount.address,
      data: functionAbi,
    };
    const signedTx = await rpcInstance.eth.accounts.signTransaction(
      transactionObject,
      userPrivateKey
    );
    const receipt = await rpcInstance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    return true;
  } catch (error) {
    console.error(`Transaction error: ${error}`);
    return false;
  }
}

async function approve(fromPrivateKey, toAddress, amount) {
  try {
    const fromAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(fromPrivateKey);
    const nonce = await rpcInstance.eth.getTransactionCount(
      fromAccount.address
    );
    const functionAbi = mttContract.methods
      .approve(toAddress, amount)
      .encodeABI();
    const gasPrice = 0;
    const gasLimit = 210000;
    const transactionObject = {
      nonce: rpcInstance.utils.toHex(nonce),
      gasPrice: rpcInstance.utils.toHex(gasPrice),
      gas: rpcInstance.utils.toHex(gasLimit),
      to: MTT_CONTRACT_ADDRESS,
      from: fromAccount.address,
      data: functionAbi,
    };

    const signedTx = await rpcInstance.eth.accounts.signTransaction(
      transactionObject,
      fromPrivateKey
    );
    const receipt = await rpcInstance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    return true;
  } catch (error) {
    console.error(`Transaction error: ${error}`);
    return false;
  }
}

async function deposit(fromPrivateKey, tokenId, amount) {
  try {
    const userAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(fromPrivateKey);
    const nonce = await rpcInstance.eth.getTransactionCount(
      userAccount.address
    );
    const functionAbi = nftContract.methods
      .deposit(tokenId, amount)
      .encodeABI();
    const gasPrice = 0;
    const gasLimit = 210000;
    const transactionObject = {
      nonce: rpcInstance.utils.toHex(nonce),
      gasPrice: rpcInstance.utils.toHex(gasPrice),
      gas: rpcInstance.utils.toHex(gasLimit),
      to: NFT_CONTRACT_ADDRESS,
      from: userAccount.address,
      data: functionAbi,
    };
    const signedTx = await rpcInstance.eth.accounts.signTransaction(
      transactionObject,
      fromPrivateKey
    );
    const receipt = await rpcInstance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(`Transaction confirmed: ${receipt.transactionHash}`);
    console.log(`Gas used: ${receipt.gasUsed}`);
    return true;
  } catch (error) {
    console.error(`Transaction error: ${error}`);
    return false;
  }
}

function getAddress(privateKey) {
  const userAccount = rpcInstance.eth.accounts.privateKeyToAccount(privateKey);
  return userAccount.address;
}

export {
  getMTTBalance,
  getNFTList,
  getSSFBalance,
  getNFTURI,
  makeNFT,
  buyMTT,
  sellMTT,
  withdraw,
  transferMTT,
  transferSSF,
  getAddress,
  deposit,
  approve,
};
