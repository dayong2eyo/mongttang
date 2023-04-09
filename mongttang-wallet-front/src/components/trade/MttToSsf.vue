<template>
  <div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 1개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img 
          class="pointer clickable" 
          v-on:click="sell(100)"
          data-bs-toggle="modal"
          data-bs-target="#cautionModal"
          src="@/assets/100MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 2개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img 
          class="pointer clickable" 
          v-on:click="sell(200)" 
          data-bs-toggle="modal"
          data-bs-target="#cautionModal"
          src="@/assets/200MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 5개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img 
          class="pointer clickable" 
          v-on:click="sell(500)" 
          data-bs-toggle="modal"
          data-bs-target="#cautionModal"
          src="@/assets/500MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 10개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img
          class="pointer clickable"
          v-on:click="sell(1000)"
          data-bs-toggle="modal"
          data-bs-target="#cautionModal"
          src="@/assets/1000MTT.png"
        />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰
        100개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img
          class="pointer clickable"
          v-on:click="sell(10000)"
          data-bs-toggle="modal"
          data-bs-target="#cautionModal"
          src="@/assets/10000MTT.png"
        />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
        class="modal fade"
        id="cautionModal"
        tabindex="-1"
        aria-labelledby="cautionModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="cautionModalLabel">
                요청 완료
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              블록체인의 특성상, 거래가 반영되기까지 시간이 다소 걸릴 수
              있습니다.              
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { sellMTT, getMTTBalance, getSSFBalance } from "@/api/backend";

export default {
  computed: {
    privateKey() {
      return this.$store.getters.getPrivateKey;
    },
    ssf() {
      return this.$store.getters.getSsf;
    },
    mtt(){
      return this.$store.getters.getMtt;
    }
  },
  methods: {
    sell(amount) {
      if(this.mtt >= amount){        
        sellMTT(this.privateKey, amount)
        .then((res)=>{
          if(res){
            window.alert("거래가 완료되었습니다.");
            getMTTBalance(this.privateKey).then((response) => {
              console.log(response);
              this.$store.commit("SET_MTT", response.data);
            });
            getSSFBalance(this.privateKey).then((response) => {
              console.log(response);
              this.$store.commit("SET_SSF", response.data);
            });
          }else{
            window.alert("거래가 실패하였습니다.");
          }
        });
      }else{
        window.alert("MTT 잔액이 부족합니다.");
      }
    },
  },
};
</script>
<style>
.trade-choice {
  margin-bottom: 15px;
}
.buy-button {
  margin-top: 5px;
  color: #ffffff;
  border-style: none;
  background-color: #00d8ff;
}
.clickable:active{
  filter: opacity(0.5) drop-shadow(0 0 0 #ff0000);
}
</style>
