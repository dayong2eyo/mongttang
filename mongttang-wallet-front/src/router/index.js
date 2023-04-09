import { createRouter, createWebHistory } from 'vue-router';
import WalletView from '../views/Wallet.vue';
import TradeView from '../views/Trade.vue';

const routes = [
  {
    path: '/',
    name: 'wallet',
    component: WalletView
  },
  {
    path: '/trade',
    name: 'trade',
    component: TradeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
