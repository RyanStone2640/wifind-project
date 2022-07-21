<template>
  <div class="leftBar">
    <div class="wifindText">WIFind 打卡系統</div>
    <div class="nameText">
      <p>使用者：{{ 'Ryan' }}</p>
      <!-- userInformation[0].username -->
    </div>
    <div class="buttonGroup">
    	<button class="btn-style" @click="toTable">
    		表格
    	</button>
    	<button class="btn-style" @click="toChart">
    		圖表
    	</button>    	
    </div>
  </div>	
</template>
<script type="text/javascript">
	export default {
	  name:'Sidebar',
	  data(){
	    return{
	    }
	  },
	  computed:{
	  },	  
	  mounted(){
	  },	  
	  methods: {
	  	toTable(){
	  		this.$router.push("/table");
	  	},
	  	toChart(){
	  		this.$router.push("/chart");
	  	}	  	
	  }
	} 
</script>

<style lang="scss" scoped>
.leftBar {
  width: 300px;
  height: 100%;
  border-right: solid 2px #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 36px;
}
.wifindText {
  letter-spacing: 2px;
  font-size: 32px;
  font-weight: 600;
  color: #5891e5;
}
.nameText {
  margin-top: 45px;
  color: #5891e5;
  font-weight: 500;
}
.buttonGroup {
  display: block;
  margin-top: 60px;
  text-align: right;
}
.buttonGroup .btn-style {
  // width: 300px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border: solid 2px #d9d9d9;
  border-right: none;
  &:hover{
    color: #fff;
    background-color: rgb(26, 68, 205);
  }
}	
</style>

	