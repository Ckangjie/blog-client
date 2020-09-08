<template>
  <el-row type="flex" class="row-bg archive" justify="center">
    <el-col :span="12" v-if="show" style="color:#cccc">
      <svg-icon iconClass="zwsj" class="goods" />暂无数据
    </el-col>
    <el-col :span="12" v-else>
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
              <div class="tiem-skill">
                <span>
                  <svg-icon iconClass="zuozhe" />
                  {{item.author||(item.username===null?'匿名':item.username)}}
                </span>
                <span>
                  <svg-icon iconClass="shijian" />
                  :{{item.time}}
                </span>
                <svg-icon iconClass="biaoqian" class="goods" />
                <span class v-if="item.skill">:{{item.skill}}</span>
                <span class v-else>javascript</span>
              </div>
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
      show: false,
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
        pageSize: this.pageSize,
        currentPage: (this.currentPage - 1) * this.pageSize,
      };
      if (getName() != undefined) {
        data.author = getName();
      }
      data.archive = "archive";
      data.client = "client";
      this.loading = true;
      this.$store.dispatch("article/getArticle", data).then((res) => {
        this.articleList = res.data;
        if (this.articleList.length > 0) {
          this.show = false;
        } else {
          this.show = true;
        }
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
      let list = this.articleList;
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
.el-timeline-item:last-child {
  margin-bottom: 15px;
}
</style>
