import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TableView from '../views/TableView.vue';
import ChartView from '../views/ChartView.vue';
import notFoundView from '../views/notFoundView.vue';
import store from '../store/index.js';

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
  },
  {
  	path: '/:pathMatch(.*)*',
  	name: 'notFoundView',
  	component: notFoundView
  }
];



const router = createRouter({
  history: createWebHistory(),
  sensitive: true,
  routes,
});


//  需登入才能顯示的路徑
router.beforeEach(async function(to, from, next){

  if (to.path == '/chart'|| to.path == '/chart/' || to.path == '/table' || to.path == '/table/') {
  	if(store.userInformation == false){
  		alert("尚未登入!")
			 next('/')
  	}
  	else{
  		next()
  	}
  }
  else {
    next()
  }
})
export default router;