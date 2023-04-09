<template>
  <div class="trade-area">
    <!--구입, 판매 상단메뉴-->
    <br />
    <h1 class="title">토큰교환</h1>
    <hr />
    <TokenBalance></TokenBalance>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col">
          <div style="padding-top: 15px">
            <RouterLink :to="route"
              ><img src="@/assets/지갑.png" height="55"
            /></RouterLink>
          </div>
          내 지갑
        </div>
        <div class="col">
          <div
            class="pointer"
            data-bs-toggle="modal"
            data-bs-target="#sendModal"
          >
            <img src="@/assets/Polygon2.png" height="70" />
          </div>
          내보내기
        </div>
        <div class="col">
          <div
            class="pointer"
            data-bs-toggle="modal"
            data-bs-target="#depositModal"
          >
            <img src="@/assets/deposit.png" height="70" />
          </div>
          입금하기
        </div>
      </div>
    </div>
    <hr />
    <div class="row token-choice">
      <div
        :class="{
          'col-6': true,
          pointer: true,
          'active-color': ssfToMttStatus === true,
        }"
        id="ssfTomtt"
        @click="showSsfToMtt"
      >
        SSF<img src="../../assets/SSAFYCoin.png" class="token-icon" /><img
          src="../../assets/arrow.png"
          class="token-icon"
        />MTT<img src="../../assets/MonttangCoin.png" class="token-icon" />
      </div>
      <div
        :class="{
          'col-6': true,
          pointer: true,
          'active-color': mttToSsfStatus === true,
        }"
        id="mttTossf"
        @click="showMttToSsf"
      >
        MTT<img src="../../assets/MonttangCoin.png" class="token-icon" /><img
          src="../../assets/arrow.png"
          class="token-icon"
        />SSF<img src="../../assets/SSAFYCoin.png" class="token-icon" />
      </div>
    </div>
    <hr />
    <!--상단메뉴 선택에 따라 구입, 판매메뉴 컴포넌트 변경-->
    <div v-if="ssfToMttStatus"><SsfToMtt></SsfToMtt></div>
    <div v-if="mttToSsfStatus"><MttToSsf></MttToSsf></div>
  </div>
  <!-- 내보내기 Modal -->
  <div
    class="modal fade"
    id="sendModal"
    tabindex="-1"
    aria-labelledby="sendModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="sendModalLabel">
            전송할 주소와 SSF코인의 수량을 정해주세요.
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >주소</span
            >
            <input
              v-model="toAddress"
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >수량</span
            >
            <input
              v-model="amount"
              type="number"
              class="form-control"
              style="text-align: right"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
            <span class="input-group-text" id="inputGroup-sizing-default"
              >SSF</span
            >
          </div>
          <div>
            블록체인의 특성상 거래가 반영되기까지 시간이 소요될 수 있습니다.
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="doTransferSSf"
          >
            확인
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 입금 Modal -->
  <div
    class="modal fade"
    id="depositModal"
    tabindex="-1"
    aria-labelledby="depositModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="depositModalLabel">
            아래 주소로 SSF 토큰을 전송해주세요.
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          블록체인의 특성상, 입금이 반영되기까지 시간이 다소 걸릴 수 있습니다. 10 ~ 20초 후 새로고침을 눌러주세요.
          <br />
          주소 :{{ address }}
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
import SsfToMtt from "@/components/trade/SsfToMtt.vue";
import MttToSsf from "@/components/trade/MttToSsf.vue";
import TokenBalance from "../wallet/TokenBalance.vue";
import { transferSSF, getMTTBalance, getSSFBalance } from "@/api/backend";

export default {
  name: "TradeArea",
  components: {
    SsfToMtt,
    MttToSsf,
    TokenBalance,
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
  methods: {
    showSsfToMtt: function () {
      this.ssfToMttStatus = true;
      this.mttToSsfStatus = false;
    },
    showMttToSsf: function () {
      this.ssfToMttStatus = false;
      this.mttToSsfStatus = true;
    },
    doTransferSSf() {
      if(this.ssf >= this.amount){      
          transferSSF(
            this.privateKey,
            this.toAddress,
            this.amount
            ).then((res)=>{
              if(res){
                window.alert("전송이 완료되었습니다.");
                getMTTBalance(this.privateKey).then((response) => {
                  console.log(response);
                  this.$store.commit("SET_MTT", response.data);
                });
                getSSFBalance(this.privateKey).then((response) => {
                  console.log(response);
                  this.$store.commit("SET_SSF", response.data);
                });
              }else{
                window.alert("전송이 실패하였습니다.");
              }
            });
          }else{
            window.alert("SSF 잔액이 부족합니다.");
          }
    },
  },
  data() {
    return {
      ssfToMttStatus: true,
      mttToSsfStatus: false,
      route: "/?key=" + this.$store.state.privateKey,
    };
  },
};
</script>
<style>
.active-color {
  background-color: aqua;
}
.token-count {
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}
.token-choice {
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 0px;
}
.token-icon {
  height: 30px;
  width: 30px;
  margin: 5px;
}
.trade-title {
  height: 40px;
  font-size: 20px;
  border-bottom: 1px solid #eaeaea;
}
.trade-area {
  margin: 40px auto;
  width: 500px;
  border: 1px solid #eaeaea;
}
.top-area {
  padding: 0px;
  display: flex;
  height: 50px;
  list-style: none;
}
li {
  position: relative;
  width: 50%;
  height: 100%;
}
.tab-pointer {
  font-size: 20px;
  position: absolute;
  left: 45%;
  top: 30%;
  text-align: center;
  font-weight: bold;
}
.pointer {
  cursor: pointer;
}
</style>
