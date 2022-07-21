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
    background-color: #f1f7ff;
    &:hover{
      color: white;
      background-color: rgb(37, 106, 185);
    }
  }
}
</style>

	