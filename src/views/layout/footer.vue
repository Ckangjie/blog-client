<template>
  <el-row class="footer">
    <div v-if="showFooter">
      runing:
      <span class="days">{{day}}天</span>
      <span>xiaodu|</span>
      <a href="http://beian.miit.gov.cn">黔ICP备2020008036号-1</a>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      day: 0,
    };
  },
  computed: {
    showFooter: function () {
      return this.$store.state.article.showFooter;
    },
  },
  methods: {
    runTime() {
      console.log(this);
      var s1 = "2020-08-31",
        _this = this,
        s2,
        days,
        number_of_days; //设置为你的建站时间
      s1 = new Date(s1.replace(/-/g, "/"));
      s2 = new Date();
      days = s2.getTime() - s1.getTime();
      _this.day = number_of_days = parseInt(days / (1000 * 60 * 60 * 24));
    },
  },
  mounted() {
    this.runTime();
  },
};
</script>

<style scoped="scoped" lang="less">
.footer {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 20px;
}
.footer {
  .days {
    margin-right: 20px;
  }
}
</style>
