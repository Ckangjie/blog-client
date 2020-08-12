<template>
  <div class="uploader">
    <el-upload
      class="avatar-uploader"
      :action="api"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getAvatar } from "../utils/auth.js";
export default {
  data() {
    return {
      imageUrl: "",
      api:
        process.env.NODE_ENV === "production"
          ? "http://120.79.186.106:3306/uploadAvatar"
          : "/api/uploadAvatar",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      sessionStorage.setItem("avatar", res.data.url);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    showAvtar() {
      this.imageUrl =
        getAvatar() !== "null"
          ? getAvatar()
          : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
    },
  },
  mounted() {
    this.showAvtar();
  },
};
</script>

<style scoped lang="less">
.uploader /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.uploader /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.uploader /deep/ .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>