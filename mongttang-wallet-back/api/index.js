import { BLOCKCHAIN_URL, API_BASE_URL } from "../config/index.js";
import Web3 from "web3";
import axios from "axios";

function createAPIInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });
  return instance;
}

function createRPCInstance() {
  const web3 = new Web3(new Web3.providers.HttpProvider(`${BLOCKCHAIN_URL}`));
  return web3;
}

function createAccount() {
  const web3 = new Web3(new Web3.providers.HttpProvider(`${BLOCKCHAIN_URL}`));
  const account = web3.eth.accounts.create();
  console.log(account);
}

export { createAPIInstance, createRPCInstance, createAccount };
