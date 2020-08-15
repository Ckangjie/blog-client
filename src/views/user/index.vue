<template>
  <el-row type="flex" class="row-bg about" justify="center">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>❤</span>关于我
        </div>
        <el-col :span="12">
          <div class="user-from">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  placeholder="请输入用户名"
                  v-model="ruleForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="上传头像" prop="avatar">
                <Upload></Upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12" style="text-align: center;">其他</el-col>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Upload from "../../components/uploadImg.vue";
import { testEmail } from "../../utils/reg";
import { saveInfo } from "../../api/user.js";
import { getAvatar, getUsername } from "../../utils/auth.js";
export default {
  data() {
    return {
      name: "",
      ruleForm: {
        username: "",
        avatar: "",
      },
      rules: {
        username: [
          { message: "请输入用户名", trigger: "blur", required: true },
        ],
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.ruleForm.avatar) {
            this.ruleForm.avatar =
              process.env.VUE_APP_URL + "/" + sessionStorage.getItem("avatar");
          } else if (!this.ruleForm.username) {
            this.ruleForm.username = getUsername();
          } else {
            this.ruleForm.oldAvatar = getAvatar();
            saveInfo(this.ruleForm).then((res) => {
              this.$store.dispatch("user/getInfo").then((res) => {});
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 显示信息
    showInfo() {
      this.ruleForm.username = this.$store.state.user.username;
    },
  },
  mounted() {
    this.$store.dispatch("user/getInfo");
    this.showInfo();
  },
};
</script>

<style>
</style>
