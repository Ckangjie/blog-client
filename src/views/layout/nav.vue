<template>
  <el-row class="nav">
    <div class="search" v-if="showSearch">
      <el-input
        v-model="searchKey"
        placeholder="输入关键字搜索"
        class="searchKey"
        @input="search(searchKey)"
        @keyup.up.native="keyupUp()"
        @keyup.down.native="down()"
      />
      <div class="result" v-if="searchKey?true:false">
        <div
          class="result-item hide"
          v-for="(item,index) in searchData"
          :class="searchIdx==index?'active':''"
          :key="index"
          @click="details(item)"
          @keyup.enter="details(item)"
        >{{item.title}}</div>
      </div>
    </div>
    <el-col :span="12" v-for="(item,index) in menuList" :key="index">
      <el-menu
        v-for="(subItem,index) in item.children"
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        mode="horizontal"
        :key="index"
      >
        <el-menu-item :index="subItem.path" v-if="!subItem.meta.hidden">
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- 登录 -->
    <el-dropdown v-if="Login">
      <div class="avatar">
        <el-avatar :src="avatar"></el-avatar>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,index) in dropdownList"
          :key="index"
          @click.native="dropdownBtn(index)"
        >{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 未登录 -->
    <div class="goLogin" @click="goLogin()" v-if="showLogin">登录</div>
  </el-row>
</template>

<script>
import { search, readCount } from "../../api/article";
import { removeToken, getAvatar } from "../../utils/auth";

export default {
  data() {
    return {
      showSearchItem: true,
      menuList: [],
      searchKey: "",
      idx: 0,
      searchIdx: -1,
      dropdownList: ["个人中心", "发布文章", "退出登录"],
      hidden: false,
    };
  },
  computed: {
    showLogin: function () {
      if (!this.$store.state.user.token) return true;
    },
    Login: function () {
      if (this.$store.state.user.token) return true;
    },
    searchData: function () {
      return this.$store.state.article.searchList;
    },
    showSearch: function () {
      if (this.$store.state.article.showSearch) {
        return true;
      } else {
        return false;
      }
    },
    avatar: function () {
      var avatar = "";
      if (this.$store.state.user.avatar) {
        avatar = this.$store.state.user.avatar;
      } else {
        avatar =
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
      }
      return avatar;
    },
  },
  methods: {
    keyupUp() {
      let data = this.$store.state.article.searchList;
      this.searchIdx--;
      if (this.searchIdx < 0) {
        this.searchIdx = data.length - 1;
      }
    },
    down() {
      let data = this.$store.state.article.searchList;
      if (this.searchIdx <= data.length - 2) {
        this.searchIdx++;
      } else {
        this.searchIdx = 0;
      }
    },
    tabNav(index) {
      this.idx = index;
    },
    getMenu() {
      this.menuList = this.$router.options.routes;
    },
    // 搜索
    search(value) {
      if (!value) {
        this.$store.state.article.searchList = [];
        return false;
      } else {
        this.$store.dispatch("article/search", value);
      }
    },
    dropdownBtn(index) {
      if (index === 1) {
        this.$router.push("/release");
      } else if (index === 2) {
        this.$store.dispatch("user/logout").then((res) => {
          if (
            (res.status === 200 && this.$route.path === "/release") ||
            this.$route.path === "/user"
          ) {
            this.$router.push("/dashboard");
          }
        });
      } else {
        this.$router.push("/user");
      }
    },
    goLogin() {
      this.hidden = true;
      this.$router.push("/login");
    },
    details(item) {
      var id = item.id,
        count = item.readCount + 1,
        data = {};
      data.id = id;
      data.count = count;
      readCount(data).then((res) => {
        if (res.status === 200) {
          this.$router.push({
            path: "/details/" + id,
          });
        }
      });
    },
    keyup13() {
      var _this = this;
      document.onkeydown = function (e) {
        let key = window.event.keyCode;
        if (key === 13) {
          var data = _this.$store.state.article.searchList;
          data.forEach((item, index) => {
            if (_this.searchIdx === index) {
              _this.details(item);
              _this.searchIdx = -1;
              _this.searchKey = "";
            }
          });
        }
      };
    },
  },
  mounted() {
    this.getMenu();
    this.keyup13();
  },
};
</script>

<style scoped lang='less'>
@background: #fff;
@import "../../style/nav.less";
</style>
