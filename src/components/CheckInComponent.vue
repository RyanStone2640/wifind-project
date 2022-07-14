<template>
  <div class="leftBar">
    <div class="wifindText">WIFind 打卡系統</div>
    <div class="nameText">
      <p>使用者：{{ userInformation[0].username }}</p>
    </div>
    <div class="buttonGroup">
      <button @click="">表格</button>
      <button>圖表</button>
      <!-- <button>部門Ａ</button>
      <button>部門Ｂ</button>
      <button>部門Ｃ</button> -->
    </div>
  </div>
  <div class="rightBar">
    <div class="topBar">
      <button class="logoutBtn" @click="logOut()">登出</button>
    </div>
    <br />
    <h2 class="nameBar">
      目前顯示： {{ userInformation[0].username }} 出勤紀錄
    </h2>
    <div class="searchBar">
      <p class="recordNumber">共 {{ userInformation.length }} 筆紀錄</p>
      <div class="searchInput">
        <!-- <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            日期
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="data in filterDate">
              <a class="dropdown-item" href="#">{{ data }}</a>
            </li>
          </ul>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            v-show="userInformation[0].status == 1"
          >
            姓名
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="data in filterUserName">
              <a class="dropdown-item" href="#">{{ data }}</a>
            </li>
          </ul>
        </div> -->
        <div class="dropdown">
          <select class="btn btn-secondary p-1" v-model="selectData">
            <option selected value="全部">全部日期</option>
            <option v-for="data in filterDate" :value="data">
              {{ data }}
            </option>
          </select>
        </div>
        <div class="dropdown" v-show="userInformation[0].status == 1">
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
      <table>
        <tr class="title">
          <th>日期</th>
          <!-- <th>部門</th> -->
          <th>姓名</th>
          <th>上班</th>
          <th>下班</th>
        </tr>
        <tr v-for="data in selectUserInformation">
          <td>{{ data.date }}</td>
          <td>{{ data.username }}</td>
          <td>{{ data.inTime }}</td>
          <td>{{ data.outTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: [],
      filterDate: [],
      username: [],
      filterUserName: [],
      selectData: "全部",
      selectName: "全部",
    };
  },
  computed: {
    userInformation() {
      // console.log(this.$store.state.userInformation);
      for (let i = 0; i < this.$store.state.userInformation.length; i++) {
        this.date.push(this.$store.state.userInformation[i].date);
      }
      // console.log(this.date);
      const filteredArray = this.date.filter(
        (ele, pos) => this.date.indexOf(ele) == pos
      );
      this.filterDate = filteredArray.sort();
      // console.log(filteredArray);
      // const obj = Object.assign({}, filteredArray.sort());
      // // console.log(obj);
      // this.filterDate = obj;

      for (let i = 0; i < this.$store.state.userInformation.length; i++) {
        this.username.push(this.$store.state.userInformation[i].username);
      }
      // console.log(this.username);
      const filteredName = this.username.filter(
        (ele, pos) => this.username.indexOf(ele) == pos
      );
      // console.log(filteredName);
      this.filterUserName = filteredName;
      // const objName = Object.assign({}, filteredName);
      // // console.log(objName);
      // this.filterUserName = objName;
      return this.$store.state.userInformation;
    },
    selectUserInformation() {
      let vm = this;
      let result;

      if (vm.selectData == "全部" && vm.selectName == "全部") {
        result = vm.userInformation.filter((item) => {
          return item;
        });
      } else if (vm.selectData !== "全部" && vm.selectName == "全部") {
        result = vm.userInformation.filter((item) => {
          return item.date == vm.selectData;
        });
      } else if (vm.selectName !== "全部" && vm.selectData == "全部") {
        result = vm.userInformation.filter((item) => {
          return item.username == vm.selectName;
        });
      } else {
        result = vm.userInformation.filter((item) => {
          return item.date == vm.selectData && item.username == vm.selectName;
        });
      }
      return result;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("clearInformation");
      return this.$router.push("/");
    },
  },
  mounted() {
    console.log(this.userInformation);
  },
};
</script>

<style scoped>
.leftBar {
  width: 350px;
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
.buttonGroup button {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border: solid 2px #d9d9d9;
  border-right: none;
}
.rightBar {
  position: absolute;
  left: 350px;
  width: calc(100% - 380px);
  margin-left: 30px;
  padding-right: 30px;
}
.topBar {
  border-bottom: solid 2px #d9d9d9;
  text-align: right;
  margin-top: -50px;
  margin-left: -30px;
  margin-right: -30px;
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
.logoutBtn {
  width: 85px;
  height: 35px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: solid 1px #d9d9d9;
  background-color: #f1f7ff;
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
</style>
