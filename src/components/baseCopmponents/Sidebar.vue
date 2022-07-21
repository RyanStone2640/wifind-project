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
    return {};
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
  .wifindText {
    margin-left: 30px;
    letter-spacing: 2px;
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
    border-right: none;
    &:hover {
      color: #fff;
      background-color: #5891e5;
    }
  }
}

.active {
  color: #fff;
  background-color: #5891e5;
}
</style>
