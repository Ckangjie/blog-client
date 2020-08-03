<template>
  <div class="content">
    <div class="nav-box">
      <navBar />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer-box">
      <!-- <btm></btm> -->
    </div>
    <template>
      <el-backtop></el-backtop>
    </template>
  </div>
</template>

<script>
import navBar from "./nav";
import btm from "./footer.vue";
export default {
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    getMenu() {
      this.menuList = this.$router.options.routes;
    }
  },
  components: {
    navBar,
    btm
  },
  mounted() {
    this.getMenu();
  }
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
  padding: 80px 0 80px 0;
}

.content .nav-box {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
</style>
