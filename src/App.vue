<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HomeView from './views/HomeView.vue'
// import { ref } from 'vue';
 
export default {
   components:{
     HomeView
   }
 }
</script>

<template>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
</template>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
