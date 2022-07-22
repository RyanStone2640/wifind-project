<template>
  <Sidebar></Sidebar>
  <div class="rightBar">
    <Navbar></Navbar>
    <div class="container">
      <!-- overall -->
      <Overall :parent-data="userAttendanceData"></Overall>

      <hr/>
      <!-- chart -->
      <div class="chartContainer">
        <v-chart class="chartHeight" :option="barchart" autoresize />
      </div>
      <hr/>
      <div class="chartContainer">
        <v-chart class="chartHeight" :option="piechart" autoresize />
      </div>
    </div>
  </div>
  <!-- <div>{{ userInformation }}</div> -->
</template>

<script setup>
import VChart from "vue-echarts";
import Sidebar from "./baseCopmponents/Sidebar.vue";
import Navbar from "./baseCopmponents/Navbar.vue";
import Overall from "./baseCopmponents/overall.vue";

import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// vuex
const store = useStore();
// vue-router
const router = useRouter();

const date = ref([]);

const filterDate = ref([]);

const username = ref([]);

const filterUserName = ref([]);

const selectData = ref("全部");

const selectName = ref("全部");

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
      data: [5, 2, 7, 5, 5, 5, 2, 7, 5, 5],
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
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "inner",
            formatter: "{d}%",
          },
          labelLine: {
            show: false,
          },
        },
      },
    },
  ],
});
onMounted(() => {});

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
  {
    title: "請假率",
    number: "5%",
    color: "#1AAF68",
  },
]);
</script>

<style lang="scss" scoped>
.rightBar {
  position: absolute;
  left: 300px;
  width: calc(100% - 300px);
  margin-left: 0;
  padding-right: 0;
  border-left: solid 2px #d9d9d9;
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
