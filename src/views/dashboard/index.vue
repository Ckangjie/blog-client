<template>
  <div class="article">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :xs="20" :md="20" :sm="20" :lg="20">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="16" :xs="16" :md="16" :sm="16" v-loading="loading">
            <div v-for="item in showData" :key="item.id">
              <el-card class="box-card article-item">
                <el-image :src="topImg" class="hotArticle" v-if="item.readCount>500"></el-image>
                <div slot="header" class="clearfix">
                  <span
                    class="title"
                    v-if="item.title"
                    @click="details(item)"
                    :title="item.title"
                  >{{item.title}}</span>
                  <span class="title" v-else>暂无标题</span>
                  <div class="tiem-skill">
                    <span>
                      <svg-icon iconClass="zuozhe" />
                      {{item.username!==null?item.username:'匿名'}}
                    </span>
                    <span>
                      <svg-icon iconClass="shijian" />
                      :{{item.time}}
                    </span>
                    <svg-icon iconClass="biaoqian" class="goods" />
                    <span class v-if="item.skill">:{{item.skill}}</span>
                    <span class v-else>javascript</span>
                  </div>
                </div>
                <div v-for="o in 1" :key="o" class="text item">
                  <el-row>
                    <el-col :span="8" style="display:none">
                      <el-image :src="item.images" class="iamges"></el-image>
                    </el-col>
                    <el-col :span="16" class="a">
                      <div class="article-conf hide">
                        <p v-if="item.content">{{item.content}}</p>
                        <p v-else>暂无数据</p>
                      </div>
                      <div class="conf-btm">
                        <span class="read" @click="details(item)">阅读文章</span>
                        <span>
                          <svg-icon iconClass="eye" class="eye" />
                          {{item.readCount}}
                        </span>
                        <!-- <span class="iconfont icon-yanjing"></span> -->
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6" :xs="6" :md="6" :lg="6" class="hidden-sm-and-down hidden-md-only">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>技能标签</span>
              </div>
              <div v-for="o in 1" :key="o" class="text skill-item">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >{{tag}}</el-tag>
                <span v-if="dynamicTags.length==0" class="null">暂无数据</span>
              </div>
            </el-card>
            <el-card class="box-card hot">
              <div slot="header" class="clearfix">
                <span>热门文章</span>
              </div>
              <div v-for="o in hotList" :key="o.id" class="text hot-item clearfix">
                <span class="hot hide-1 fl" @click="details(o)">{{o.title}}</span>
                <i class="iconfont icon-yanjing">{{o.readCount}}</i>
              </div>
              <!-- <span class="more icon-xiangxiazhankai iconfont"></span> -->
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>友情链接</span>
              </div>
              <div v-for="(otem,index) in Links" :key="index" class="text hot-item clearfix">
                <a class="hot hide-1 fl" :href="otem.src">{{otem.name}}</a>
              </div>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>友情链接</span>
              </div>
              <div v-for="o in 1" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
        </el-row>
        <el-col :span="16" :xs="16" :md="16" :xl="16" :sm="16">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3,5,10,15,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { loading } from "element-ui";
import { getArticle, getList, readCount, paging } from "../../api/article.js";
import { rTime } from "../../utils/common";
export default {
  data() {
    return {
      Links: [
        { src: "http://www.lcfan.top/banxia/index/", name: "刘财" },
        { src: "http://www.lcfan.top/banxia/index/", name: "吴海" },
        { src: "http://www.lcfan.top/banxia/index/", name: "潘哥" },
      ],
      loading: false,
      currentPage: Number(sessionStorage.getItem("currentPage"))
        ? Number(sessionStorage.getItem("currentPage"))
        : 1,
      pageSize: 3,
      topImg:
        process.env.NODE_ENV === "production"
          ? "http://120.79.186.106:3306/top.png"
          : "http://127.0.0.1:3001/top.png",
      dynamicTags: [
        "java",
        "javascript",
        "node.js",
        "vue.js",
        "react.js",
        "css",
      ],
    };
  },
  computed: {
    // 文章总数
    total: function () {
      return this.$store.state.article.total;
    },
    // 热门文章
    hotList: function () {
      let list = this.$store.state.article.hotList,
        data = [];
      list.filter((item) => {
        if (item.readCount >= 500) {
          data.push(item);
        }
      });
      return data;
    },
    // 文章列表
    showData() {
      var _this = this;
      let list = _this.$store.state.article.list;
      list.forEach((item) => {
        item.time = rTime(item.time);
      });
      // 按阅读量排序
      list.sort(_this.handle("readCount"));
      return list;
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      sessionStorage.setItem("currentPage", val);
      this.getList();
    },
    details(item) {
      var id = item.id,
        count = item.readCount + 1,
        data = {};
      data.id = id;
      data.count = count;
      readCount(data).then((res) => {
        if (res.status === 200) {
          this.$router.push({
            path: "/details/" + id,
          });
        }
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    getList() {
      let data = {
        pageSize: this.pageSize,
        currentPage: (this.currentPage - 1) * this.pageSize,
      };
      data.client = "client";
      this.loading = true;
      this.$store.dispatch("article/getArticle", data).then((res) => {
        this.loading = false;
      });
    },
    // 根据阅读量降序排序
    handle(property) {
      return function (a, b) {
        const val1 = a[property];
        const val2 = b[property];
        return val2 - val1;
      };
    },
  },
  comments: {
    // zujian
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped="scoped" lang="less">
@import "../../style/dashboard.less";
.eye.svg-icon {
  font-size: 30px;
  position: relative;
  top: 4px;
  right: -12px;
}
</style>
