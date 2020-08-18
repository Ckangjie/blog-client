<template>
  <el-row type="flex" class="row-bg release" justify="center">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>❤</span>关于我
        </div>
        <div>
          <p>小白煎鱼一条,渴望技术</p>
        </div>
        <!-- 添加富文本编辑器 wangeditor -->
        <div class="clearfix">
          <!-- 标题 -->
          <el-input type="text" class="title" placeholder="请输入标题" name="title" v-model="title" />
          <!-- 富文本编辑框 -->
          <div id="editor" class="editor" v-highlight></div>
          <!-- 标签技能 -->
          <el-select v-model="skill" placeholder="请选择" class="skill">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- 提交按钮 -->
          <el-button type="primary" @click="submit" class="submit" :disabled="disabled">保存</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Editor from "wangeditor";
import { MessageBox } from "element-ui";
import { saveArticle } from "../../api/article.js";
import { getName } from "../../utils/auth";
export default {
  name: "editor",
  data() {
    return {
      disabled: false,
      editor: "",
      title: "",
      skill: "",
      options: [
        {
          value: "java",
        },
        {
          value: "JavaScript",
        },
        {
          value: "node.js",
        },
        {
          value: "react.js",
        },
        {
          value: "css",
        },
        {
          value: "Angular.js",
        },
        {
          value: "php",
        },
        {
          value: "vue.js",
        },
        {
          value: "html",
        },
      ],
    };
  },
  methods: {
    // 创建编辑器
    createEditor() {
      //实例化一个编辑器
      this.editor = new Editor("#editor");
      // 图片上传格式
      this.editor.customConfig.uploadImgShowBase64 = true;
      // 显示网络图片上传选项
      this.editor.customConfig.showLinkImg = true;
      // 关闭样式过滤(貌似不生效)
      // this.editor.customConfig.pasteFilterStyle = false;
      // 多语言
      // this.editor.customConfig.lang = {'设置标题': 'title','正文': 'p', '链接文字': 'link text','链接': 'link','上传图片': 'upload image','上传': 'upload','创建': 'init'}
      // 开发语言配置
      // this.editor.config.codeDefaultLang = 'javascript'
      // 自定义颜色
      this.editor.customConfig.colors = [
        "#000000",
        "#eeece0",
        "#1c487f",
        "#4d80bf",
        "#c24f4a",
        "#8baa4a",
        "#7b5ba1",
        "#46acc8",
        "#f9963b",
        "#ffffff",
      ];
      // 配置字体
      this.editor.customConfig.fontNames = [
        "宋体",
        "微软雅黑",
        "Arial",
        "Tahoma",
        "Verdana",
      ];
      //创建
      this.editor.create();
      // 富文本内容
      // 初始 <p style='color:#cccccc'>请输入内容……</p>
      this.editor.txt.html();
    },
    // 上传富文本内容
    submit() {
      let content = this.editor.txt.html(),
        data = {};
      if (this.title && content && this.skill) {
        this.disabled = true;
        data.title = this.title;
        data.content = content;
        data.skill = this.skill;
        data.author = getName() ? getName() : "疾风之刃";
        saveArticle(data).then((res) => {
          if (res.status === 200) {
            this.disabled = false;
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 500);
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请填写相应的内容",
          center: true,
        });
      }
    },
  },
  mounted() {
    this.createEditor();
  },
};
</script>

<style scoped lang="less">
@import url("http://open.sojson.com/highlight.js/9.0.0/default.min.css");
.release .title.el-input {
  margin-bottom: 10px;
}
.release /deep/ .el-input__inner:focus {
  outline: none;
  border-color: #c0c4cc;
}

.release .submit {
  padding: 10px;
  float: right;
  margin-top: 10px;
}
.release .skill {
  margin-top: 10px;
}
.el-col.el-col-12 {
  z-index: 0;
}
</style>
