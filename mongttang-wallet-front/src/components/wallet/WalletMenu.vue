<template>
  <br />
  <h1 class="title">내 지갑</h1>
  <hr />
  <TokenBalance></TokenBalance>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          <RouterLink :to="route"
            ><img src="@/assets/trade.png" height="70"
          /></RouterLink>
        </div>
        거래소
      </div>
      <div class="col">
        <div class="pointer" data-bs-toggle="modal" data-bs-target="#sendModal">
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
              블록체인의 특성상, 입금이 반영되기까지 시간이 다소 걸릴 수
              있습니다. 10 ~ 20초 후 새로고침을 눌러주세요.
              <br />
              주소 : {{ address }}
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
    </div>
  </div>
</template>

<script>
import TokenBalance from "./TokenBalance.vue";
import { transferSSF, getMTTBalance, getSSFBalance } from "@/api/backend";

export default {
  data() {
    return {
      route: "/trade?key=" + this.$store.state.privateKey,
      toAddress: "",
      amount: "",
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
  components: {
    TokenBalance,
  },
  methods: {
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
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
