<template>
  <hr />
  <h2 class="title">내 NFT 목록</h2>
  <div class="container" v-for="(nftId, idx) in nftIds" :key="nftId">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <img
          :src="nftImages[nftId]"
          width="200"
        />
      </div>
      <div class="col">
        <!-- <div>토큰 : {{ nftId }}</div> -->
        <br />
        <div class="money">현재 잔액 : {{ nftBalances[idx] }}</div>
        <div class="money">총 수익 금액 : {{ nftTotalEarneds[idx] }}</div>
        <br />
        <img
          class="pointer"
          src="@/assets/withdraw.png"
          data-bs-toggle="modal"
          data-bs-target="#withdrawModal"
          v-on:click="doWithdraw(nftId, nftBalances[idx])"
        />
        <br />
      </div>
      <div class="col"></div>
    </div>
    <hr />
  </div>

  <!-- 출금 Modal -->
  <div
    class="modal fade"
    id="withdrawModal"
    tabindex="-1"
    aria-labelledby="withdrawModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="withdrawModalLabel">
            출금 요청이 신청되었습니다.
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          블록체인의 특성상, 출금이 반영되기까지 시간이 다소 걸릴 수 있습니다.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { withdraw, getMTTBalance, getSSFBalance, getNFTList, getNFTURI } from "@/api/backend";
import axios from 'axios';

export default {
  name: "NFTList",
  data() {
    return {
      nftIds: [],
      nftBalances: [],
      nftTotalEarneds: [],
      nftImages: {},
    };
  },
  computed: {
    privateKey() {
      return this.$store.getters.getPrivateKey;
    },
    address() {
      return this.$store.getters.getAddress;
    },
  },
  created() {
    if (this.address) {
      getNFTList(this.address).then((res) => {
        const data = res.data;
        this.nftIds = data.nftIds;
        this.nftBalances = data.nftBalances;
        this.nftTotalEarneds = data.nftTotalEarneds;
      });
    }
  },
  watch: {
    address() {
      getNFTList(this.address).then((res) => {
        console.log(res);
        const data = res.data;
        this.nftIds = data.nftIds;
        this.nftBalances = data.nftBalances;
        this.nftTotalEarneds = data.nftTotalEarneds;
      });
    },
    nftBalances(){
      this.nftIds.forEach( (nftId) => {
        getNFTURI(nftId).then((res) => {
          console.log(res.data);
          return axios.get(res.data);
        }).then((res)=>{   
          const metadata = res.data;
          this.nftImages[nftId] = metadata.image;
          console.log(this.nftImages);
        }).catch((err)=>{
          console.log(err);
        })
      });
    }
  },
  methods: {
    doWithdraw(tokenId, amount) {
      withdraw(this.privateKey, tokenId, amount)
      .then((res)=>{
        if(res){
          window.alert("출금이 완료되었습니다.");
          getMTTBalance(this.privateKey).then((response) => {
            console.log(response);
            this.$store.commit("SET_MTT", response.data);
          });
          getSSFBalance(this.privateKey).then((response) => {
            console.log(response);
            this.$store.commit("SET_SSF", response.data);
          });
          getNFTList(this.address).then((res) => {
            console.log(res);
            const data = res.data;
            this.nftIds = data.nftIds;
            this.nftBalances = data.nftBalances;
            this.nftTotalEarneds = data.nftTotalEarneds;
          });          
      }else{
        window.alert("출금이 실패하였습니다.");
      }
      });
    },
  },
};
</script>
