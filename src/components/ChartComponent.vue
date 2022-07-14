<template>
	<Sidebar></Sidebar>
  <div class="rightBar">
  	<Navbar></Navbar>
    <h2 class="nameBar">
      目前顯示： {{ userInformation[0].username }} 出勤紀錄
    </h2>
  </div>
</template>

<script>
import Sidebar from "./baseCopmponents/Sidebar.vue"
import Navbar from "./baseCopmponents/Navbar.vue"

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
  components: {
  	Sidebar,
  	Navbar
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
  },
};
</script>

<style scoped>

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
</style>
