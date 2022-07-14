import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue';
import TableComponent from '../components/TableComponent.vue';
import ChartComponent from '../components/ChartComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/table',
    name:'table',
    component:TableComponent
  },
  {
    path: '/chart',
    name:'chart',
    component:ChartComponent
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;