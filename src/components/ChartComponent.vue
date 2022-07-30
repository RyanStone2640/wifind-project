<template>
  <Sidebar></Sidebar>
  <div class="rightBar">
    <Navbar></Navbar>
    <div class="container">
			<div class="content-box filter-box">
				<p class="title"><strong>查看出缺勤狀況</strong></p> 	  	
				<hr/> 		 	
				<div class="d-flex mt-2 flex-wrap">
			  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range fixedStart/>
			  	<button class="confirm-btn btn" @click="search">搜尋</button>
				</div>
			</div>  
			<hr/>  	
      <!-- overall -->
      <Overall :parent-data="userAttendanceData"></Overall>

      <!-- chart -->
      <hr/>
      <div class="chartContainer">
        <v-chart class="chartHeight" :option="piechart" autoresize />
      </div>      
      <div class="chartContainer">
        <v-chart class="chartHeight" :option="barchart" autoresize />
      </div>
      <hr/>
    </div>
  </div>
</template>

<script setup>
import VChart from "vue-echarts";
import Sidebar from "./baseCopmponents/Sidebar.vue";
import Navbar from "./baseCopmponents/Navbar.vue";
import Overall from "./baseCopmponents/overall.vue";

import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios"
// ======================================================================
// vuex
const store = useStore();
// vue-router
const router = useRouter();
// ======================================================================
const date = ref(""); 	// date
onMounted(() => {
  const startDate = new Date(2022, 6, 2);
  const endDate = new Date(2022, 6, 32)
  date.value = [startDate, endDate]	
})
watch(date, (newVal, oldVal) => { //  set date to yyyy-mm-dd
	for(let i = 0; i <= date.value.length - 1; i++){
		date.value[i] = newVal[i].toISOString().split('T')[0] 
	}
});
// =========================================================================
// overall
const userAttendanceData = ref([
  {
    title: "出勤率",
    number: "98%",
    color: "#558ABA",
  },
  {
    title: "遲到率",
    number: "5%",
    color: "#1AAF68",
  },
  {
    title: "缺席率",
    number: "5%",
    color: "#1AAF68",
  },
]);
// chart
const barchart = ref({
  title: {
    text: "出席狀況",
    textStyle: {
      color: "#558ABA",
    },
  },
  tooltip: {},
  legend: {
    left: "right",
  },
  xAxis: {
    data: [],
    nameTextStyle: {
      fontWeight: "bolder",
    },
  },
  yAxis: {
    nameTextStyle: {
      fontWeight: "bolder",
    },
  },
  series: [
    {
      name: "到班時數",
      data: [],
      type: "bar",
      itemStyle: {
        color: "#5891e5",
      },
    },
  ],
});
const piechart = ref({
  title: {
    text: "本月整體出勤狀況",
    textStyle: {
      color: "#558ABA",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "right",
    data: ["正常到班", "遲到數", "缺勤"],
  },
  series: [
    {
      name: "本月整體出勤狀況",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "正常到班" },
        { value: 310, name: "遲到數" },
        { value: 234, name: "缺勤" },
      ],
      label: {
        show: true,
        position: "inner",
        formatter: "{d}%",
      },
      labelLine: {
        show: false,
      },
    },
  ],
});
const search = async()=>{
	let href = 'http://34.125.253.73:8080/worktime'
	// console.log(date.value)
	let postData = {
		enddate: date.value[1],
		startdate: date.value[0],
		username: store.state.userInformation.username
	}
	try{
		barchart.value.xAxis.data = [];
		barchart.value.series[0].data = []
		let { data } = await axios.post(href, postData)
		// console.log(data)
		for(let i = 0; i < data.length; i++){
			barchart.value.xAxis.data.push(data[i].date)
			barchart.value.series[0].data.push(data[i].worktime)			
		}
	}
	catch(e){
		console.log(e)
		alert("資料錯誤，請再搜尋一次")
	}

}
</script>

<style lang="scss" scoped>
.rightBar {
  position: absolute;
  left: 300px;
  width: calc(100% - 300px);
  margin-left: 0;
  padding-right: 0;
  border-left: solid 2px #d9d9d9;
  .confirm-btn {
  	border-style: none;
  	background-color: #558ABA;
  	color: #fff;  	
  	height: 38px;

  }  
}
.container {
  padding: 2rem 3rem;
  height: 100%;
}

.overall-box {
  width: auto;
  height: auto;
}
.chartContainer {
  height: 100vh;
  .chartHeight {
    height: 100%;
  }
}
</style>
