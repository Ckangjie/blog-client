<template>
  <el-row class="content">
    <el-col class="nav-box">
      <navBar />
    </el-col>
    <el-col class="main" :xs="24" :md="24" :xl="24" :sm="24" :span="24">
      <router-view />
    </el-col>
    <el-col class="footer-box">
      <bottom />
    </el-col>
    <template>
      <el-backtop></el-backtop>
    </template>
  </el-row>
</template>

<script>
import navBar from "./nav";
import bottom from "./footer.vue";
export default {
  data() {
    return {
      menuList: [],
    };
  },
  methods: {
    getMenu() {
      this.menuList = this.$router.options.routes;
    },
  },
  components: {
    navBar,
    bottom,
  },
  mounted() {
    this.getMenu();
  },
};
</script>

<style scoped>
.content {
  min-width: 1200px;
  /* background-color: #F9F9F9; */
}

.content .nav-box {
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.2);
}

.content .main {
  margin-top: 4%;
}

.content .nav-box {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
</style>
