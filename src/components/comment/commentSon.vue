<template>
  <el-row>
    <el-col>
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
          <span class="close" @click="close" v-if=" this.reply_name != ''?true:false">+</span>
          <el-form-item prop="content" ref="d">
            <el-input
              id="textpanel"
              class="textarea textpanel"
              type="textarea"
              :rows="2"
              :placeholder="placeholder"
              v-model="comment.content"
            ></el-input>
          </el-form-item>
          <div class="emoji-panel-btn" @click="showEmojiPanel">
            <img src="../../assets/img/face_logo.png" />
          </div>
          <emoji @emojiClick="appendEmoji" v-if="isShowEmojiPanel" class="one" />
          <el-button
            type="primary"
            @click="onSubmit('comment')"
            class="submit"
          >提交{{pid}}{{reply_name}}</el-button>
        </el-col>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import { getName, getAvatar } from "../../utils/auth";
import emoji from "../Emoji/EmojiPanel";
export default {
  props: {
    reply_name: String,
    pid: Number,
  },
  components: {
    emoji,
  },
  data() {
    return {
      isShowEmojiPanel: false,
      name: getName(),
      showForm: true,
      id: null,
      vatShow: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      commentList: [],
      textarea: "",
      placeholder: this.reply_name != "" ? "@" + this.reply_name : "",
      comment: {
        website: "",
        name: "",
        email: "",
        content: "",
        reply_name: this.reply_name != "" ? this.reply_name : "",
        pid: this.pid != "" ? this.pid : 0,
      },
    };
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
    onSubmit(formName) {
      var _this = this;
      if (!getName()) {
        let data = this.comment,
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
        if (data.pid === null) {
          data.pid = 0;
        }
        if (!data.content) {
          this.$message({
            type: "info",
            message: "请输入评论内容",
            center: true,
          });
        } else {
          this.$store.dispatch("article/addComment", data).then((res) => {
            this.isShowEmojiPanel = false;
            this.$emit("getComment");
            this.$emit("close");
            this.showForm = true;
          });
        }
      } else {
        _this.resetForm(formName);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang='less'>
@import url("../../style/emoji.css");
span.emoji-item-common.emoji-angry {
  width: 50px;
}
.content {
  .emoji-panel-btn {
    position: relative;
    width: 50%;
    top: 50px;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    img {
      height: 24px;
      width: 24px;
    }
  }
  .comment-content {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }
  .comment-content {
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
}
.subItem-span {
  display: inline-block;
}
.emoji-panel-wrap.one {
  top: 160px;
  z-index: 50;
}
.subItem-span /deep/ .emoji-item-common,
.content /deep/ .emoji-item-common {
  background: url("~@/assets/img/emoji_sprite.png") no-repeat;
  transform: scale(0.5, 0.5);
  display: inline-block;
  margin: -18px -14px;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
}
</style>