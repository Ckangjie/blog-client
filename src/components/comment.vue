<template>
  <el-row class="comment">
    <div class="comment-form">
      <el-form ref="comment" :model="comment" v-if="showForm">
        <el-col :span="8">
          <el-form-item prop="name">
            <el-input type="text" v-model="comment.name" autocomplete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="email">
            <el-input type="text" autocomplete="off" v-model="comment.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="website">
            <el-input
              type="text"
              autocomplete="off"
              v-model="comment.website"
              placeholder="https://"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col class="comment-content">
          <el-form-item prop="content" ref="d">
            <el-input
              id="textpanel"
              class="textarea textpanel"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="comment.content"
            ></el-input>
          </el-form-item>
          <div class="emoji-panel-btn" @click="showEmojiPanel">
            <img src="../assets/emoji/face_logo.png" />
          </div>
          <emoji @emojiClick="appendEmoji" v-if="isShowEmojiPanel" class="one" />
          <el-button type="primary" @click="onSubmit('comment')" class="submit">提交</el-button>
        </el-col>
      </el-form>
      <el-col class="comment-list">
        <el-col class="vcount">{{count>0?count+'条评论':'请发表你的神评……'}}</el-col>
        <el-col class="vcards">
          <el-col class="vcard" v-for="(item,index) in showData" :key="index">
            <el-col :span="2">
              <el-avatar :size="30" :src="item.avatar?item.avatar:circleUrl"></el-avatar>
            </el-col>
            <el-col :span="22">
              <el-col class="name-time">
                <span class="name">{{item.name}}</span>
                <span class="time">{{item.time}}</span>
              </el-col>
              <el-col :span="22" v-html="item.content" class="content"></el-col>
              <el-col :span="2">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="'回复->'+item.name"
                  placement="right"
                >
                  <span
                    @click="vat"
                    class="fr vat"
                    :data-pid="item.id"
                    :data-index="index"
                    :data-name="item.name"
                    v-if="name===item.name?false:true"
                  >回复</span>
                </el-tooltip>
              </el-col>
              <!-- 一级回复内容 -->
              <el-form
                ref="vatcomment"
                :model="vatcomment"
                class="vatcomment"
                v-if="id===item.id?true:false"
              >
                <el-col :span="8" ref="f">
                  <el-form-item prop="name">
                    <el-input
                      type="text"
                      v-model="vatcomment.name"
                      autocomplete="off"
                      placeholder="请输入用户名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="email">
                    <el-input
                      type="text"
                      autocomplete="off"
                      v-model="vatcomment.email"
                      placeholder="请输入邮箱"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="website">
                    <el-input
                      type="text"
                      autocomplete="off"
                      v-model="vatcomment.website"
                      placeholder="https://"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="comment-content vat-comment">
                  <span class="close" @click="close(item,index)">+</span>
                  <el-form-item prop="content">
                    <el-input
                      id="textpanel2"
                      class="textarea textpanel2"
                      type="textarea"
                      :rows="2"
                      :placeholder="vatplaceholder"
                      v-model="vatcomment.content"
                    ></el-input>
                  </el-form-item>
                  <div class="emoji-panel-btn" @click="showEmojiPanel">
                    <img src="../assets/emoji/face_logo.png" />
                  </div>
                  <emoji @emojiClick="appendEmoji" v-if="isShowEmojiPanel" class="two" />
                  <el-button type="primary" @click="onSubmit('vatcomment')" class="submit">提交</el-button>
                </el-col>
              </el-form>
              <el-col class="vcard subItem" v-for="(subItem,sindex) in item.children" :key="sindex">
                <el-col :span="2">
                  <el-avatar :size="30" :src="subItem.avatar?subItem.avatar:circleUrl"></el-avatar>
                </el-col>
                <el-col :span="22">
                  <el-col class="name-time">
                    <span class="name" ref="name">{{subItem.name}}</span>
                    <span class="time">{{subItem.time}}</span>
                  </el-col>
                  <el-col :span="22">
                    <span class="span">@{{subItem.reply_name}}</span>
                    <div v-html="subItem.content" class="subItem-span"></div>
                  </el-col>
                  <el-col :span="2">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="'回复->'+subItem.name"
                      placement="right"
                    >
                      <span
                        @click="vat"
                        class="fr vat"
                        :data-index="sindex"
                        :data-name="subItem.name"
                        :data-subId="subItem.id"
                        :data-pid="item.id"
                        v-if="name===subItem.name?false:true"
                      >回复</span>
                    </el-tooltip>
                  </el-col>
                  <!-- 二级回复 -->
                  <el-form
                    ref="vatcomment"
                    :model="vatcomment"
                    class="vatcomment"
                    v-if="subId===subItem.id?true:false"
                  >
                    <el-col :span="8" ref="f">
                      <el-form-item prop="name">
                        <el-input
                          type="text"
                          v-model="vatcomment.name"
                          autocomplete="off"
                          placeholder="请输入用户名"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="email">
                        <el-input
                          type="text"
                          autocomplete="off"
                          v-model="vatcomment.email"
                          placeholder="请输入邮箱"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="website">
                        <el-input
                          type="text"
                          autocomplete="off"
                          v-model="vatcomment.website"
                          placeholder="https://"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="comment-content vat-comment">
                      <span class="close" @click="close(item,index)">+</span>
                      <el-form-item prop="content">
                        <el-input
                          id="textpanel3"
                          class="textarea textpanel3"
                          type="textarea"
                          :rows="2"
                          :placeholder="vatplaceholder"
                          v-model="vatcomment.content"
                        ></el-input>
                      </el-form-item>
                      <div class="emoji-panel-btn" @click="showEmojiPanel">
                        <img src="../assets/emoji/face_logo.png" />
                      </div>
                      <emoji
                        @emojiClick="appendEmoji"
                        data-id="3"
                        v-if="isShowEmojiPanel"
                        class="three"
                      />
                      <el-button type="primary" @click="onSubmit('vatcomment')" class="submit">提交</el-button>
                    </el-col>
                  </el-form>
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
import { MessageBox, Notification } from "element-ui";
import { getName, getAvatar } from "../utils/auth";
import { computedTime, rTime } from "../utils/common";
import emoji from "../components/Emoji/EmojiPanel";
export default {
  data() {
    return {
      isShowEmojiPanel: false,
      name: getName(),
      subId: null,
      showForm: true,
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
    emoji,
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
      commentData.forEach((item) => {
        if (item.name === getName()) {
          item.avatar = getAvatar();
        }
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
        console.log(4);
      } else {
        const el = document.getElementById("textpanel2");
        console.log(this.vatcomment);
        console.log(5);
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
    onSubmit(formName) {
      var _this = this;
      if (!getName()) {
        let data = formName === "comment" ? this.comment : this.vatcomment,
          router_path = this.$route.path;
        if (router_path.includes("details")) {
          data.article_id = sessionStorage.getItem("id");
        }
        if (!data.name) {
          let name = getName()
            ? getName()
            : "网友" + (Math.floor(Math.random() * 8999) + 1000);
          data.name = name;
        }
        if (!data.content) {
          this.$message({
            type: "info",
            message: "请输入评论内容",
            center: true,
          });
        } else {
          this.$store.dispatch("article/addComment", data).then((res) => {
            this.close();
            this.isShowEmojiPanel = false;
            this.showForm = true;
            this.getComment();
            if (formName === "comment") {
              this.resetForm(formName);
            } else {
              this.vatcomment = {};
              return;
            }
          });
        }
      } else {
        alert("请登录");
        if (formName === "comment") {
          this.resetForm(formName);
        } else {
          this.vatcomment = {};
          return;
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getComment() {
      this.$store.dispatch("article/commentList", {
        client: "client",
        pageSize: this.pageSize,
        currentPage: 0,
      });
    },
    vat(e) {
      setTimeout(() => {
        // console.log(this.$refs.vatcomment[0]);
      }, 200);
      this.showForm = false;
      this.vatcomment = {};
      let params = e.target.dataset;
      if (params.subid) {
        this.id = null;
      } else {
        this.id = Number(params.pid);
      }
      this.vatcomment.pid = Number(params.pid);
      this.subId = Number(params.subid);
      this.vatcomment.reply_name = params.name;
      this.vatplaceholder = "@" + params.name;
    },
    close() {
      this.id = null;
      this.subId = null;
    },
    emoji(word) {
      // 生成html
      // const type = word.substring(1, word.length - 1);
      // return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },
  },
  mounted() {
    this.getComment();
    this.emoji();
  },
};
</script>
<style scoped lang='less'>
@import url("../style/comment.less");
@import url("../style/emoji.css");
span.emoji-item-common.emoji-angry {
  width: 50px;
  background: red;
}
.content {
  /deep/ .emoji-item-common {
    background: url("~@/assets/img/emoji_sprite.png") no-repeat;
    transform: scale(0.5, 0.5);
    display: inline-block;
    margin: -18px -14px;
    vertical-align: middle;
    &:hover {
      cursor: pointer;
    }
  }
  .vatcomment-content {
    /deep/ .emoji-panel-wrap {
      top: 100px !important;
    }
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
}
</style>