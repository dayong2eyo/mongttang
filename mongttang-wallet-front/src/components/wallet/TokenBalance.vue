<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <h2>{{ ssf }} SSF</h2>
      <h2>{{ mtt }} MTT</h2>
    </div>
    <div class="col-2"></div>
    <div class="col-2 pointer" @click="[doGetMTTBalance(), doGetSSFBalance()]">
      <img src="@/assets/pngwing.png" height="50" />
      <div style="font-size: smaller">잔액 <br />새로고침</div>
    </div>
  </div>
</template>

<script>
import { getMTTBalance, getSSFBalance } from "@/api/backend";

export default {
  name: "TokenBalance",
  data() {
    return {
    };
  },
  computed: {
    privateKey() {
      return this.$store.getters.getPrivateKey;
    },
    address() {
      return this.$store.getters.getAddress;
    },
    ssf() {
      return this.$store.getters.getSsf;
    },
    mtt(){
      return this.$store.getters.getMtt;
    }
  },
  created() {
    if (this.address) {
      this.doGetMTTBalance();
      this.doGetSSFBalance();
    }
  },
  methods: {
    doGetMTTBalance() {
      getMTTBalance(this.privateKey).then((response) => {
        console.log(response);
        this.$store.commit("SET_MTT", response.data);
      });
    },
    doGetSSFBalance() {
      getSSFBalance(this.privateKey).then((response) => {
        console.log(response);
        this.$store.commit("SET_SSF", response.data);
      });
    },
  },
  watch: {
    address() {
      this.doGetMTTBalance();
      this.doGetSSFBalance();
    },
  },
};
</script>

<style></style>
