<template>
  <el-row class="comment">
    <div class="comment-form">
      <!-- 表单1 -->
      <commentForm
        v-if="showForm"
        :reply_name="reply_name"
        :pid="pid"
        :subid="subid"
        @getComment="getComment"
      />
      <el-col class="comment-list">
        <el-col class="vcount">{{count>0?count+'条评论':'请发表你的神评……'}}</el-col>
        <el-col class="vcards">
          <el-col class="vcard" v-for="(item,index) in showData" :key="index">
            <el-col :span="2">
              <el-avatar :size="30" :src="item.avatar"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-col class="name-time">
                <span class="name">{{item.username}}</span>
                <span class="time">{{item.time}}</span>
              </el-col>
              <el-col :span="22" v-html="item.content" class="content"></el-col>
              <el-col :span="2">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="'回复->'+item.username"
                  placement="right"
                >
                  <span
                    @click="vat"
                    class="fr vat"
                    :data-pid="item.id"
                    :data-index="index"
                    :data-name="item.username"
                    v-if="name===item.name?false:true"
                  >回复</span>
                </el-tooltip>
              </el-col>
              <!-- 一级回复内容 -->
              <!-- 表单二 -->
              <commentForm
                @getComment="getComment"
                @close="close"
                v-if="id===item.id?true:false"
                :reply_name="reply_name"
                :pid="pid"
                :subid="subid"
              />
              <el-col class="vcard subItem" v-for="(subItem,sindex) in item.children" :key="sindex">
                <el-col :span="2">
                  <el-avatar :size="30" :src="subItem.avatar"></el-avatar>
                </el-col>
                <el-col :span="22">
                  <el-col class="name-time">
                    <span class="name" ref="name">{{subItem.username}}</span>
                    <span class="time">{{subItem.time}}</span>
                  </el-col>
                  <el-col :span="22">
                    <span class="span">@{{subItem.reply_name}}:</span>
                    <div v-html="subItem.content" class="subItem-span"></div>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="'回复->'+subItem.username"
                      placement="right"
                    >
                      <span
                        @click="vat"
                        class="fr vat"
                        :data-index="sindex"
                        :data-name="subItem.username"
                        :data-subid="subItem.id"
                        :data-pid="item.id"
                        v-if="name===subItem.name?false:true"
                      >回复</span>
                    </el-tooltip>
                  </el-col>
                  <!-- 表单三 -->
                  <commentForm
                    @getComment="getComment"
                    @close="close"
                    :reply_name="reply_name"
                    :pid="pid"
                    :subid="subid"
                    v-if="subid===subItem.id?true:false"
                  />
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col class="more" :loding="true" v-if="!vatShow">
        <span @click="getMore()">{{count>0?'点击加载更多':''}}</span>
      </el-col>
      <el-col class="more" :loding="true">
        <!-- <span>+点击加载更多</span> -->
        <el-button type="primary" :loading="true" class="btn" v-if="vatShow">加载中</el-button>
      </el-col>
    </div>
  </el-row>
</template>
<script>
import commentForm from "./comment/commentSon";
import { MessageBox, Notification } from "element-ui";
import { getName, getAvatar } from "../utils/auth";
import { computedTime, rTime } from "../utils/common";
export default {
  data() {
    return {
      reply_name: "",
      params: "",
      isShowEmojiPanel: false,
      name: getName(),
      subid: null,
      showForm: true,
      pid: null,
      id: null,
      vatShow: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      commentList: [],
      textarea: "",
      comment: {
        website: "",
        name: "",
        email: "",
        content: "",
        reply_name: "",
        pid: 0,
      },
      vatcomment: {
        website: "",
        name: "",
        email: "",
        content: "5",
        reply_name: "",
        pid: 0,
      },
      vatplaceholder: "",
      pageSize: 8,
      num_comment: 0,
    };
  },
  components: {
    commentForm,
  },
  computed: {
    count: function () {
      return this.$store.state.article.commentList.length;
    },
    showData: function () {
      let commentData = this.$store.state.article.commentList;
      commentData.forEach((item) => {
        item.time = computedTime(rTime(item.time));
      });
      return this.$treeData(commentData, "id", "pid", "children");
    },
  },
  methods: {
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    appendEmoji(text) {
      var html = `<span class="emoji-item-common emoji-${text}"></span>`;
      if (this.showForm) {
        const el = document.getElementById("textpanel");
        this.comment.content += html;
      } else {
        const el = document.getElementById("textpanel2");
        this.vatcomment.content += html;
      }
    },
    getMore() {
      let data = this.$store.state.article.commentList.length;
      this.pageSize += 5;
      this.vatShow = !this.vatShow;
      setTimeout(() => {
        this.getComment();
        setTimeout(() => {
          this.num_comment =
            this.$store.state.article.commentList.length - data;
          if (this.num_comment > 0) {
            this.$notify({
              title: "获取成功!",
              message: "已加载" + this.num_comment + "条新的评论",
              type: "success",
            });
          } else {
            this.$notify({
              title: "暂无数据!",
              message: "你都已经获取全部评论啦",
              type: "warning",
            });
          }
        }, 200);
        this.vatShow = !this.vatShow;
      }, 500);
    },
    getComment() {
      this.reply_name = "";
      this.pid = 0;
      this.$store.dispatch("article/commentList", {
        client: "client",
        pageSize: this.pageSize,
        currentPage: 0,
      });
    },
    vat(e) {
      this.showForm = false;
      this.vatcomment = {};
      let params = e.target.dataset;
      this.params = JSON.stringify(params);
      if (params.subid) {
        this.id = null;
      } else {
        this.id = Number(params.pid);
      }
      this.pid = Number(params.pid);
      this.subid = Number(params.subid);
      this.reply_name = params.name;
      this.placeholder = "@" + params.name;
    },
    close() {
      this.showForm = true;
      this.id = null;
      this.subid = null;
    },
  },
  mounted() {
    this.getComment();
  },
};
</script>
<style scoped lang='less'>
@import url("../style/comment.less");
@import url("../style/emoji.css");
span.emoji-item-common.emoji-angry {
  width: 50px;
}
.subItem-span {
  display: inline-block;
  /deep/ .emoji-item-common {
    background: url("~@/assets/img/emoji_sprite.png") no-repeat;
    transform: scale(0.5, 0.5);
    display: inline-block;
    margin: -18px -14px;
    vertical-align: middle;
  }
}
.content {
  /deep/ .emoji-item-common {
    background: url("~@/assets/img/emoji_sprite.png") no-repeat;
    transform: scale(0.5, 0.5);
    display: inline-block;
    margin: -18px -14px;
    vertical-align: middle;
  }
}
</style>