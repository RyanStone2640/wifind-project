<template>
  <Sidebar></Sidebar>
  <div class="rightBar">
    <Navbar></Navbar>
    <div class="container">
      <h2 class="nameBar">
        目前顯示： {{ $store.state.userInformation.username }} 出勤紀錄
      </h2>
      <div class="searchBar">
        <p class="recordNumber">共 {{ tableData.length }} 筆紀錄</p>
        <div class="searchInput">
          <div class="dropdown">
            <select class="btn btn-secondary p-1" v-model="selectData">
              <option selected value="全部">全部日期</option>
              <option v-for="data in filterDate" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
          <div
            class="dropdown"
            v-show="$store.state.userInformation.status == 1"
          >
            <select class="btn btn-secondary p-1" v-model="selectName">
              <option value="全部" selected>全部姓名</option>
              <option v-for="data in filterUserName" :value="data">
                {{ data }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="mainTable">
        <vxe-table
          :data="selectTableData"
          class="tableInfo"
          emptyText="no data"
        >
          <vxe-column
            v-for="(data, index) of tableTitle"
            :field="data.field"
            :title="data.title"
          ></vxe-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./baseCopmponents/Sidebar.vue";
import Navbar from "./baseCopmponents/Navbar.vue";
import axios from "axios";

export default {
  name: "TableComponent",
  data() {
    return {
      date: [],
      filterDate: [],
      username: [],
      filterUserName: [],
      selectData: "全部",
      selectName: "全部",
      tableTitle: [
        { field: "date", title: "日期" },
        { field: "username", title: "姓名" },
        { field: "inTime", title: "上班" },
        { field: "outTime", title: "下班" },
      ],
      tableData: [],
    };
  },
  components: {
    Sidebar,
    Navbar,
  },

  computed: {
    selectTableData() {
      let vm = this;
      let result;

      if (vm.selectData == "全部" && vm.selectName == "全部") {
        result = vm.tableData.filter((item) => {
          return item;
        });
      } else if (vm.selectData !== "全部" && vm.selectName == "全部") {
        result = vm.tableData.filter((item) => {
          return item.date == vm.selectData;
        });
      } else if (vm.selectName !== "全部" && vm.selectData == "全部") {
        result = vm.tableData.filter((item) => {
          return item.username == vm.selectName;
        });
      } else {
        result = vm.tableData.filter((item) => {
          return item.date == vm.selectData && item.username == vm.selectName;
        });
      }
      return result;
    },
  },
  methods: {},
  async mounted() {
    let postData = {
      username: this.$store.state.userInformation.username,
      status: this.$store.state.userInformation.status,
    };
    let { data } = await axios.post(
      "http://34.125.253.73:8080/search",
      postData
    );
    this.tableData = data.ReturnData;

    // set option in sort
    // set date option
    for (let i = 0; i < this.tableData.length; i++) {
      this.date.push(this.tableData[i].date);
    }

    // console.log(this.date);
    const filteredArray = this.date.filter(
      (ele, pos) => this.date.indexOf(ele) == pos
    );
    this.filterDate = filteredArray.sort();

    if (this.$store.state.userInformation.status == 1) {
      // set name option
      for (let i = 0; i < this.tableData.length; i++) {
        this.username.push(this.tableData[i].username);
      }
      // console.log(this.username);
      const filteredName = this.username.filter(
        (ele, pos) => this.username.indexOf(ele) == pos
      );
      // console.log(filteredName);
      this.filterUserName = filteredName;
    }
  },
};
</script>

<style scoped>
.rightBar {
  position: absolute;
  left: 300px;
  width: calc(100% - 300px);
  margin-left: 0;
  padding-right: 0;
  border-left: solid 2px #d9d9d9;
  height: 100%;
}
.container {
  padding: 0 3rem 0 3rem;
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
  max-height: 70vh;
  overflow: auto;
}
/*table {
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
}*/

.tableInfo {
  height: auto;
  max-height: 100%;
  overflow-y: auto;
}
</style>
