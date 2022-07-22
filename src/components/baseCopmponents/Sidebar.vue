<template>
  <div class="leftBar">
    <div class="wifindText">WIFind 打卡系統</div>
    <div class="nameText">
      <p>使用者：{{ $store.state.userInformation.username }}</p>
      <!-- userInformation[0].username -->
    </div>
    <div class="buttonGroup">
      <button
        class="btn-style"
        :class="[$route.path == '/table' ? 'active' : '']"
        @click="toTable"
      >
        表格
      </button>
      <button
        class="btn-style"
        :class="[$route.path == '/chart' ? 'active' : '']"
        @click="toChart"
      >
        圖表
      </button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Sidebar",
  data() {
    return {
      isActive: true,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    toTable() {
      this.$router.push("/table");
    },
    toChart() {
      this.$router.push("/chart");
    },
  },
};
</script>

<style lang="scss" scoped>
.leftBar {
  width: 300px;
  height: 100%;
  // border-right: solid 2px #d9d9d9;
  position: absolute;
  padding-top: 36px;
  // background-color: rgb(28, 73, 157);
   margin-bottom: 0px;
  .wifindText {
    margin-left: 30px;
    letter-spacing: 1px;
    font-size: 32px;
    font-weight: 600;
    color: #5891e5;
  }
  .nameText {
    margin-left: 30px;
    margin-top: 45px;
    color: #5891e5;
    font-weight: 500;
  }
}
.buttonGroup {
  display: block;
  margin-top: 60px;
  text-align: right;
  .btn-style {
    width: 100%;
    padding: 20px;
    border: solid 2px #d9d9d9;
    background-color: #fff;
    color: #5891e5;
    border-right: none;
    transition: 0.4s;
    &:hover {
      color: #fff;
      background-color: #5891e5;
      // transform: 3s;
    }
    &:not(:last-child){
      border-bottom: none;
    }
  }
  .active {
    color: #fff;
    background-color: #5891e5;
    // border: solid 2px #1a4692;
  }
}

</style>
