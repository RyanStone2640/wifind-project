import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TableView from '../views/TableView.vue';
import ChartView from '../views/ChartView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/table',
    name:'table',
    component:TableView
  },
  {
    path: '/chart',
    name:'chart',
    component:ChartView
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;