<template>
  <div class="vcomment" v-if="comments === true">
    <div id="vcomments"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: true
    };
  },
  mounted() {
    this.createValine();
  },

  methods: {
    createValine() {
      const Valine = require("valine");
      window.AV = require("leancloud-storage");
      const valine = new Valine({
        el: "#vcomments",
        appId: "Lx45gKTDY2fa4rIhw1XTPxkQ-gzGzoHsz",
        appKey: "T94zUsgczahdtQiuLbeOBb8q",
        notify: true,
        verify: true,
        visitor: true,
        avatar: "monsterid",
        pageSize: 5,
        highlight: true,
        enableQQ: true,
        path: window.location.pathname,
        placeholder: "欢迎留言与我分享您的想法..."
      });
      this.valineRefresh = false;
    },
    submit() {}
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        setTimeout(() => {
          //重新刷新valine
          this.createValine();
        }, 300);
      }

      /**
       * TODO:
       * 1. 使用其他方法更新评论组件 或者使用其他较为好用的评论组件
       * 2. 添加categories and tag
       * 3. 更换其他主题
       */
    }
  }
};
</script>

<style lang="less" scoped="scoped">
#vcomments {
  // max-width: 740px;
  padding: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
