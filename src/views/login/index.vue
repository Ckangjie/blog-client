<template>
  <el-row type="flex" class="row-bg login-register" justify="center">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="clearfix"><span>❤</span>关于我</div>
        <el-col :span="12">我是一条咸鱼</el-col>
        <el-col :span="12">
          <div class="login-from">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="邮箱" prop="username">
                <el-input
                  type="username"
                  v-model="ruleForm.username"
                  autocomplete="off"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="确认密码"
                prop="repassword"
                v-if="showRegister"
              >
                <el-input
                  type="password"
                  v-model="ruleForm.repassword"
                  autocomplete="off"
                  placeholder="确认密码"
                  @blur="rePwd()"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code" v-if="showLogin">
                <el-col :span="15">
                  <el-input
                    v-model="ruleForm.code"
                    placeholder="验证码"
                  ></el-input>
                </el-col>
                <el-col :span="8" class="code login-code">
                  <div @click="changeCode()">
                    {{ code }}
                    <!-- <verifyCode :identifyCode="identifyCode" /> -->
                  </div>
                </el-col>
              </el-form-item>
              <el-form-item label="验证码" prop="code" v-if="showRegister">
                <el-col :span="15">
                  <el-input
                    v-model.number="ruleForm.code"
                    placeholder="验证码"
                  ></el-input>
                </el-col>
                <el-col :span="8" class="code">
                  <div @click="getCode" v-show="show" disabled>获取验证码</div>
                  <span v-show="!show" disabled>获取中{{ count }}s</span>
                </el-col>
              </el-form-item>
              <div class="goRegister" v-if="showLogin">
                没有账号?
                <span @click="tabBtn('注册')">立即注册</span>
              </div>
              <div class="goLogin" v-if="showRegister">
                已有账号
                <span @click="tabBtn('登录')">立即登录</span>
              </div>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{
                  value
                }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { testEmail, testPwd, getLoginCode } from "../../utils/reg";
import { login, register, getCode } from "../../api/user";
import { Message } from "element-ui";
export default {
  data() {
    return {
      code: "xxxx",
      // 验证码的随机取值范围
      identifyCodes: "123456789abcdefghjkmnpqrstuvwxyz",
      show: true,
      count: "",
      timer: null,
      value: "登录",
      showRegister: false,
      showLogin: true,
      ruleForm: {
        username: "",
        password: "",
        code: "",
        repassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入邮箱",
          },
          {
            validator: testEmail,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
          },
          {
            validator: testPwd,
            trigger: "blur",
          },
        ],
        repassword: [
          {
            required: true,
            message: "请输入密码",
          },
          {
            trigger: "blur",
          },
        ],
        code: [
          {
            trigger: "blur",
            required: true,
            message: "请输入验证码",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.ruleForm;
          data.client = "client";
          if (this.value === "登录") {
            if (data.code.toLowerCase() === this.code.toLowerCase()) {
              this.$store.dispatch("user/login", data).then((res) => {
                if (res.status === 200) {
                  this.$store
                    .dispatch("user/getInfo")
                    .then((response) => {
                      if (response.status === 200) {
                        sessionStorage.setItem(
                          "defaultAvatar",
                          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        );
                        this.$router.push("/dashboard");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              });
              // login(data);
            } else {
              this.$message({
                showClose: true,
                message: "验证码错误",
                type: "warning",
                onClose: () => {
                  this.changeCode();
                },
              });
            }
          } else {
            register(data);
          }
        }
        return false;
      });
    },
    tabBtn(value) {
      var formName = "ruleForm";
      this.value = value;
      if (value === "注册") {
        this.resetForm(formName);
        this.showRegister = true;
        this.showLogin = false;
      } else {
        this.resetForm(formName);
        this.showLogin = true;
        this.showRegister = false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码
    getCode() {
      let data = this.ruleForm;
      if (data.username && data.password) {
        getCode(data);
        this.countDown();
      } else {
        this.submitForm("ruleForm");
      }
    },
    // 倒计时
    countDown(time) {
      const TIME_COUNT = 20;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 验证密码
    rePwd() {
      let data = this.ruleForm;
      if (data.password !== data.repassword) {
        this.$message({
          showClose: true,
          message: "输入的密码不一致",
          type: "warning",
        });
      }
    },
    // 点击验证码刷新验证码
    changeCode() {
      var code = "";
      var codeLength = 4; //验证码的长度
      var random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]; //随机数
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 62); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.code = code; //把code值赋给验证码
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.value = newValue;
    },
  },
  mounted() {
    // 刷新页面就生成随机验证码
    this.changeCode();
  },
};
</script>

<style scoped lang="less">
@import "../../style/elementui.less";
@import "../../style/login.less";
</style>
