import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '../components/HomeComponent.vue';
import CheckInComponent from '../components/CheckInComponent.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
  },
  {
    path: '/CheckIn',
    name:'CheckIn',
    component:CheckInComponent
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;