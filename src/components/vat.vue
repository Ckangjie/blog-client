<template>
  <el-row>
    <el-form ref="vatcomment" :model="vatcomment" class="vatcomment" v-if="idx===index?true:false">
      <el-col :span="8">
        <el-form-item prop="name">
          <el-input type="text" v-model="vatcomment.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="email">
          <el-input type="text" autocomplete="off" v-model="vatcomment.email" placeholder="请输入邮箱"></el-input>
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
        <span class="close" @click="close(item,index)">X</span>
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
    <el-col class="vcard subItem" v-for="(subItem,index) in item.children" :key="index">
      <el-col :span="2">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
      </el-col>
      <el-col :span="22">
        <el-col>
          <span class="name">{{subItem.name}}</span>
          <span class="time">{{subItem.time}}</span>
        </el-col>
        <el-col :span="22">
          <span class>@{{item.name}}</span>
          {{subItem.content}}
        </el-col>
        <el-col :span="2">
          <span @click="vat(subItem,index)" class="fr vat">回复</span>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      vatcomment: {
        website: "",
        name: "",
        email: "",
        content: "",
        reply_name: "",
      },
      vatplaceholder: "",
    };
  },
};
</script>
<style scoped lang='less'>
</style>