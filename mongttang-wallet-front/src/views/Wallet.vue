<template>
  <div class="wallet">
    <WalletMenu></WalletMenu>
    <NFTList></NFTList>
  </div>
</template>

<script>
import NFTList from "@/components/wallet/NFTList.vue";
import WalletMenu from "@/components/wallet/WalletMenu.vue";

export default {
  name: "WalletView",
  components: {
    NFTList,
    WalletMenu,
  },
};
</script>
<style>
.wallet {
  margin: 40px auto;
  width: 500px;
  border: 1px solid #eaeaea;
}
</style>
