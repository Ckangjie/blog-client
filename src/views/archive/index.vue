<template>
  <el-row type="flex" class="row-bg archive" justify="center">
    <el-col :span="12">
      <div class="block" v-loading="loading">
        <el-timeline>
          <el-timeline-item
            :timestamp="item.date"
            placement="top"
            v-for="item in showData"
            :key="item.id"
          >
            <el-card>
              <h4 class="title" @click="details(item)">{{item.title}}</h4>
              <p style="color:#aaa">
                <span>{{item.name}} 提交于 {{item.time}}</span>
                <span class="iconfont icon-jinengbiaoqian" v-if="item.skill">:{{item.skill}}</span>
                <span class="iconfont icon-jinengbiaoqian" v-else>javascript</span>
                <span class="iconfont icon-yanjing">{{item.readCount}}</span>
              </p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-col :span="12" v-if="showData.length>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import { loading } from "element-ui";
import { getList, getArticle, readCount } from "../../api/article.js";
import { rTime } from "../../utils/common";
import { getName } from "../../utils/auth.js";
export default {
  data() {
    return {
      articleList: [],
      currentPage: Number(sessionStorage.getItem("currentPageA"))
        ? Number(sessionStorage.getItem("currentPageA"))
        : 1,
      pageSize: 5,
      loading: false,
    };
  },
  methods: {
    // 文章列表
    getList() {
      let data = {
        author: getName() !== undefined ? getName() : " ",
        pageSize: this.pageSize,
        currentPage: (this.currentPage - 1) * this.pageSize,
      };
      data.archive = "archive";
      data.client = "client";
      this.loading = true;
      this.$store.dispatch("article/getArticle", data).then((res) => {
        this.loading = false;
      });
    },
    // 每页显示val条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 第val页
    handleCurrentChange(val) {
      this.currentPage = val;
      sessionStorage.setItem("currentPageA", val);
      this.getList();
    },
    // 跳转详情
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
  },
  mounted() {
    this.getList();
  },
  computed: {
    // 文章总数
    total: function () {
      return this.$store.state.article.total;
    },
    // 文章列表
    showData() {
      var _this = this;
      let list = _this.$store.state.article.list;
      list.forEach((item) => {
        item.time = rTime(item.time);
      });
      // 按阅读量排序
      return list;
    },
  },
};
</script>

<style scoped="scoped" lang="less">
.grid-content {
  background-color: #ccc;
}
.iconfont.icon-yanjing,
.iconfont.icon-jinengbiaoqian {
  margin-left: 10px;
}
.iconfont.icon-yanjing::before {
  margin-right: 5px;
}
</style>
