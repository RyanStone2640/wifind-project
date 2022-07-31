<template>
  <Sidebar></Sidebar>
  <div class="rightBar">
    <Navbar></Navbar>
    <div class="container">
	<div class="content-box filter-box">
		<p class="title"><strong>查看出勤狀態</strong></p> 	  	
		<hr/>
		<div class="d-flex flex-wrap" v-if="store.state.userInformation.status == 1">
	  	<select class="selectInfo me-2" v-model="staff">
				<option v-for="(data, index) of selectStaff" :value="data.item">
					{{ data.name }}
				</option>	      	 	
	  	</select>		  	 	  	  	
		</div> 		 	
		<div class="d-flex mt-2 flex-wrap">
	  	<Datepicker class="datepicker mb-2 me-2 w-auto" v-model="date" range/>
	  	<button class="confirm-btn btn btn-height" @click="search">搜尋</button>
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

const selectStaff = ref([])
const staff = ref("")
for(let i = 0; i < store.state.filterUserName.length; i++){
	selectStaff.value.push({
		name: store.state.filterUserName[i],
		item: store.state.filterUserName[i]
	})
}
// =========================================================================
// overall
const userAttendanceData = ref([
  {
    title: "出勤率",
    number: "",
    color: "#558ABA",
  },
  {
    title: "遲到率",
    number: "",
    color: "#1AAF68",
  },
  {
    title: "缺席率",
    number: "",
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
      radius: ["0%", "80%"],
      center: ["50%", "60%"],
      top: "0",
      data: [
        { value: '', name: "正常到班" },
        { value: '', name: "遲到數" },
        { value: '', name: "缺勤" },
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
	// barChart==================================================
	let href = 'http://34.125.253.73:8080/worktime'
	let overallHref = 'http://34.125.253.73:8080/record'
	// console.log(date.value)
	let postData = {
		enddate: date.value[1],
		startdate: date.value[0],
		username: selectStaff.value.length == 0 ? store.state.userInformation.username : staff.value 
	}
	try{
		// claer data=========================================================================
		for(let i = 0; i < userAttendanceData.value.length; i++){
			userAttendanceData.value[i].number = ""
		}		
		barchart.value.xAxis.data = [];
		barchart.value.series[0].data = []
		for(let i = 0; i < piechart.value.series[0].data.length; i++){
			piechart.value.series[0].data[i].value = ''
		}
		// get axios data=========================================================================
		let [overAlldata, data] = await Promise.all([axios.post(overallHref, postData), await axios.post(href, postData)]);	

		// sign new value for axios data object
		overAlldata = overAlldata.data
		data = data.data

		//  set value
		let sum = overAlldata.absent + overAlldata.present
		userAttendanceData.value[0].number = `${Math.round(overAlldata.present/sum*100)}%`;	
		userAttendanceData.value[1].number = `${Math.round(overAlldata.late/sum*100)}%`;
		userAttendanceData.value[2].number = `${Math.round(overAlldata.absent/sum*100)}%`;

		piechart.value.series[0].data[0].value = overAlldata.present
		piechart.value.series[0].data[1].value = overAlldata.late
		piechart.value.series[0].data[2].value = overAlldata.absent		

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
	.content-box {
	  margin: 1rem;
	  padding: 1rem;
	  .title {
	    color: #558ABA;
	    padding-left: 1rem;
	  }
	  .selectInfo {
	    width: 100px;
	    height: 38px;
	    border-radius: 4px;
	    border: 1px solid black;
	    cursor: pointer;
	  }	  
	}  
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
