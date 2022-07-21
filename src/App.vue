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
<router-view v-slot="{ Component }">
<!-- <router-view> -->
  <keep-alive>
    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
  </keep-alive>
  <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
</router-view>
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
