<template>
  <div>
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-input v-model="searchModel.userName" placeholder="用户名称"></el-input>
          </div>
        </el-col>

        <el-col :span="4" align="right">
          <div class="grid-content bg-purple-light">
            <el-button @click="getCommentList" type="primary" round icon="el-icon-search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!--查询结果 -->
    <el-card>
      <el-table :data="commentList" stripe style="width: 100%">
        <el-table-column prop="commentId" label="#" width="200"></el-table-column>
        <el-table-column prop="filmName" label="电影名称" width="200"></el-table-column>
        <el-table-column prop="userName" label="评论人" width="200"></el-table-column>
        <el-table-column prop="comment" label="评论内容" width="300"></el-table-column>
        <el-table-column prop="status" label="状态" width="200">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === '审核通过'" type="success">审核通过</el-tag>
              <el-tag v-else-if="scope.row.status === '待审核'" type="info">待审核</el-tag>
              <el-tag v-else type="danger">审核未通过</el-tag>
            </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="deleteComment(scope.row.commentId)" type="danger" icon="el-icon-delete" circle
              size="mini"></el-button>
          </template>

        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

  </div>
</template>

<script>

import commentApi from '@/api/commentManage'
export default {
  data() {
    return {
      searchModel: {
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
      // 弹出对话框标题
      title: "",
      commentList: [],
    };
  },

  methods: {
    async deleteComment(commentId) {
      this.$confirm(`请确认是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentApi.deleteCommentById(commentId).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          });
          this.getCommentList();
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCommentList();

    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getCommentList();
    },
    getCommentList() {
      commentApi.getCommentManageList(this.searchModel).then(Response => {
        this.commentList = Response.data.rows;
        this.total = Response.data.total;
      });
    },

  },
  

  created() {
    this.getCommentList();
  }
};
</script>

<style>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>