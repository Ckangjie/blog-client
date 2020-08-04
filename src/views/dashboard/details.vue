<template>
  <div class="details">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :xs="20" :md="20" :sm="20">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="16" class="item-box" v-for="(item,index) in details" :key="index">
            <div class="details-header">
              <span class="title">{{item.title}}</span>
              <div class="skill-item">
                <span class="iconfont icon-icon-test">:{{item.time.slice(0,10)}}</span>
                <span class="iconfont icon-jinengbiaoqian">:{{item.skill}}</span>
                <span class="iconfont icon-yanjing">{{item.readCount}}</span>
              </div>
            </div>
            <div class="details-item" v-html="item.content"></div>
            <div>
              <!-- <Comments :is="viewComments"></Comments> -->
              <comment ref="comment" />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Comments from "../../components/Comments";
import comment from "../../components/comment";
import { getDetails } from "../../api/article.js";
export default {
  data() {
    return {
      details: [],
      id: "",
      viewComments: "Comments",
    };
  },
  components: {
    Comments,
    comment,
  },
  methods: {
    getDetails() {
      var detailsID = this.$route.params.id;
      sessionStorage.setItem("id", detailsID);
      getDetails({ id: detailsID }).then((res) => {
        if (res.status === 200) {
          this.details = res.data;
        }
      });
    },
  },
  mounted() {
    this.getDetails();
  },
};
</script>

<style scoped lang="less">
@import "../../style/details.less";
.details /deep/ .comment-content.el-col {
  margin: 15px 0;
}
.details /deep/ .name-time {
  margin-bottom: 10px;
}
.details /deep/ .emoji-panel-wrap.one {
  top: 208px;
}
</style>
