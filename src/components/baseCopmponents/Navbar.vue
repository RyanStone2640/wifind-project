<template>
  <div class="topBar">
  	<button class="logoutBtn" @click="logOut()">登出</button>
  </div>
  <br/>
</template>
<script type="text/javascript">
	export default {
	  name:'Navbar',
	  data(){
	    return{
	    }
	  },
	  computed:{
	  },	  
	  mounted(){
	  },	  
	  methods: {
      logOut() {
        this.$store.commit("clearInformation");
        return this.$router.push("/");
      },
	  }
	} 
</script>

<style lang="scss" scoped>
.topBar {
  width: 100%;
  border-bottom: solid 2px #d9d9d9;
  text-align: right;
  .logoutBtn {
    width: 85px;
    height: 35px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    border: solid 1px #d9d9d9;
    background-color: #5891e5;
    transform: translateX(-50%);
    color: white;
    cursor: pointer;
    transition: 0.4s;
    &:hover{
      color: white;
      background-color: #2d5ea8;
    }
  }
}
</style>

	