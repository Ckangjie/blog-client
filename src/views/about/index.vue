<template>
  <el-row type="flex" class="row-bg about" justify="center">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>❤</span>关于我
        </div>
        <div>
          <p>小白煎鱼一条,渴望技术</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>❤</span>说点啥
        </div>
        <div>
          <!-- <Comments :is="viewComments"></Comments> -->
          <comment ref="comment" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Comments from "../../components/Comments.vue";
import comment from "../../components/comment";
import { testEmail } from "../../utils/reg.js";
import { addMsg } from "../../api/msg";
export default {
  components: {
    Comments,
    comment,
  },
  data() {
    return {
      viewComments: "Comments",
      images:
        "http://127.0.0.1:3001/upload_4d1463b0996ba285ef940428dc55435d.gif",
      disabled: false,
      ruleForm: {
        name: "",
        content: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入邮箱/用户名",
            trigger: "blur",
          },
          // {
          // 	validator: testEmail,
          // 	trigger: "blur"
          // }
        ],
        content: [
          {
            required: true,
            message: "请输入你想对我说的话",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.disabled = !this.disabled;
          addMsg(this.ruleForm).then((res) => {
            if (res.status === 200) {
              this.disabled = !this.disabled;
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped="scoped" lang="less">
.clearfix > span {
  color: red;
  margin-right: 10px;
}
.user.clearfix > span {
  color: black;
}
.avatar.fl > img {
  width: 50px;
  border-radius: 50%;
}
.user {
  height: 50px;
  line-height: 50px;
  margin-left: 60px;
  border-bottom: 1px dashed #ccc;
  .name {
    font-weight: 600;
  }
  .fr {
    color: #ccc !important;
  }
}
.user:hover,
.user .fr:hover {
  cursor: pointer;
}
.Comments-content {
  color: #ccc;
}
</style>
