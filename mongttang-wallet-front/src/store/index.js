import { createStore } from "vuex";

export default createStore({
  state: {
    privateKey: "",
    address: "",
    mtt: 0,
    ssf: 0 
  },
  getters: {
    getPrivateKey(state) {
      return state.privateKey;
    },
    getAddress(state) {
      return state.address;
    },
    getMtt(state) {
      return state.mtt;
    },
    getSsf(state) {
      return state.ssf;
    },
  },
  mutations: {
    SET_PRIVATEKEY(state, privateKey) {
      state.privateKey = privateKey;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_MTT(state, mtt) {
      state.mtt = mtt;
    },
    SET_SSF(state, ssf) {
      state.ssf = ssf;
    },
  },
  actions: {},
});
