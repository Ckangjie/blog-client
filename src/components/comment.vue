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
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="comment.content"
            ></el-input>
          </el-form-item>
          <emoji />
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
              <el-col :span="22">{{item.content}}</el-col>
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
                      class="textarea"
                      type="textarea"
                      :rows="2"
                      :placeholder="vatplaceholder"
                      v-model="vatcomment.content"
                    ></el-input>
                  </el-form-item>
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
                    <span class>@{{subItem.reply_name}}</span>
                    {{subItem.content}}
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
                          class="textarea"
                          type="textarea"
                          :rows="2"
                          :placeholder="vatplaceholder"
                          v-model="vatcomment.content"
                        ></el-input>
                      </el-form-item>
                      <emoji />
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
        content: "",
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
        console.log(this.$refs.vatcomment);
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
  },
  mounted() {
    this.getComment();
  },
};
</script>
<style scoped lang='less'>
@import url("../style/emoji.css");
.comment {
  padding: 20px 0;
  /deep/ .el-input__inner {
    border: 1px dashed transparent;
    border-bottom: 1px dashed #ccc;
    border-radius: 0;
  }
  /deep/ .el-input__inner:focus {
    border-bottom-color: #ef2f11;
  }
  /deep/ .submit {
    margin-top: 10px;
    padding: 5px 10px;
    float: right;
    color: #555;
    background-color: white;
    border: 1px solid #ededed;
  }
  /deep/ .submit:hover {
    color: #409eff;
    border: 1px solid #409eff;
  }
  .comment-content {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }
  /deep/ .el-textarea__inner {
    border: none;
    padding: 0;
  }
  /deep/ .el-avatar.el-avatar--circle {
    vertical-align: middle;
  }
  .vcard.el-col.el-col-24 {
    padding: 5px 0;
  }
  .vcard.subItem {
    border: none;
  }
  .el-col.el-col-2 {
    text-align: center;
  }
  .time {
    margin-left: 15px;
    color: #b3b3b3;
    font-size: 0.75em;
  }
  .vat {
    font-size: 0.8125em;
    cursor: pointer;
    color: #b3b3b3;
    outline: none;
  }
  .vat-comment {
    position: relative;
    .close {
      position: absolute;
      top: 5px;
      right: 10px;
      z-index: 5;
      cursor: pointer;
      color: #b3b3b3;
      font-size: 30px;
      transform: rotate(45deg);
    }
    .close:hover {
      transform: rotate(315deg);
      transition: all 0.2s;
    }
  }
  /deep/ .el-col.el-col-22 > span {
    color: #1abc9c;
    cursor: pointer;
  }
  /deep/ .el-col.el-col-22 > span:hover,
  .vat:hover {
    color: #ff2d52;
  }
  .more {
    text-align: center;
    color: #ccc;
    padding-top: 10px;
    cursor: pointer;
  }
  /deep/ .el-button.btn {
    background-color: transparent;
    border: none;
    color: #ccc;
  }
  .comment-list.el-col.el-col-24 {
    transition: height 0.5s;
  }
}
</style>