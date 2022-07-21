import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TableView from '../views/TableView.vue';
import ChartView from '../views/ChartView.vue';

const routes = [
  {
    path: '/',
    name: 'Homeviwe',
    component: HomeView,
  },
  {
    path: '/table',
    name:'tableview',
    component:TableView,
	  meta: { 
	    keepAlive: true, 
	   }     
  },
  {
    path: '/chart',
    name:'chartview',
    component:ChartView
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;