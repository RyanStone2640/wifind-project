<template>
	<Sidebar></Sidebar>
  <div class="rightBar">
  	<Navbar></Navbar>
    <h2 class="nameBar">
      <!-- 目前顯示： {{ userInformation }} 出勤紀錄 -->
    </h2>
		<!-- chart -->
		<div class="content-box overall-box chartContainer">
			<v-chart class="chartHeight" :option="barchart" autoresize />
			<v-chart class="chartHeight" :option="piechart" autoresize/>  	
		</div>     
  </div>

  <!-- <div>{{ userInformation }}</div> -->
</template>

<script setup>
import VChart from "vue-echarts";	
import Sidebar from "./baseCopmponents/Sidebar.vue"
import Navbar from "./baseCopmponents/Navbar.vue"

import {ref, onMounted, computed} from "vue"
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// vuex
const store = useStore();
// vue-router
const router = useRouter();

const date = ref([]);

const filterDate = ref([]);

const username =  ref([]);

const filterUserName =  ref([]);

const selectData =  ref("全部");

const selectName =  ref("全部");

// chart
const barchart = ref({
  title: {
    text: '出席狀況',
		textStyle: {
		    color: '#558ABA'
		}
  },
  tooltip: {},
  legend: {
  	left: "right",
  },
  xAxis: {
    data: [],
    nameTextStyle: {
    	fontWeight: "bolder"
    }
  },
  yAxis: {
		nameTextStyle: {
    	fontWeight: "bolder"
    }
  },
  series: [
    {
    	name: '到班時數',
      data: [5, 2, 7, 5, 5,5, 2, 7, 5, 5],
      type: 'bar',
      itemStyle: {
				color: '#558ABA'
      },
    }
  ],	  		
})
const piechart = ref({
  title: {
    text: "本月整體出勤狀況",
		textStyle: {
		    color: '#558ABA'
		}
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "right",
    data: ["正常到班", "遲到數", "缺勤"]
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
      itemStyle : {
        normal : {
             label : {
                show: true, position: 'inner',
                formatter : "{d}%"
            },
            labelLine : {
                show : false
            }
        }
      },      
    }
  ]
});

onMounted(()=>{
	 // console.log(this.$store.state.userInformation);
	for (let i = 0; i < store.state.userInformation.length; i++) {
	  date.value.push(store.state.userInformation[i].date);
	}
	// console.log(this.date);
	const filteredArray = date.value.filter(
	  (ele, pos) => date.value.indexOf(ele) == pos
	);
	
	filterDate.value = filteredArray.sort();
	
	// set data in chart
	filterDate.value.forEach(function(item, index){
		barchart.value.xAxis.data.push(item)
	})

	for (let i = 0; i < store.state.userInformation.length; i++) {
		username.value.push(store.state.userInformation[i].username);
	}
	// console.log(this.username);
	const filteredName = username.value.filter(
	  (ele, pos) => username.value.indexOf(ele) == pos
	);
	// console.log(filteredName);
	filterUserName.value = filteredName;
	console.log(store.state.userInformation);
})
</script>

<style lang="scss" scoped>

.rightBar {
  position: absolute;
  left: 350px;
  width: calc(100% - 380px);
  margin-left: 30px;
  padding-right: 30px;
}
.nameBar {
  font-size: 20px;
  text-align: start;
  margin-top: 30px;
}
.searchBar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 26px;
}
.dropdown {
  display: inline-block;
  margin-left: 15px;
}
.mainTable {
  border: solid 1px black;
  max-height: 468px;
  overflow: auto;
}
table {
  border: 0;
  border-collapse: collapse;
  border-radius: 8px;
  width: 100%;
}
.title {
  position: sticky;
  top: 0;
}
th {
  background-color: #f1f7ff;
  border: solid 1px black;
  padding: 16px 8px;
}
td {
  border: solid 1px black;
  text-align: center;
  padding: 8px;
  color: #757575;
}


.overall-box{
  width: auto;
  height: auto;
}	
.chartContainer{
	height: 100vh;
	.chartHeight{
		height: 100%
	}
}	
</style>
