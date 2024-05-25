<template>
  <div>
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-select v-model="searchModel.isPopular" clearable placeholder="是否热门">
              <el-option v-for="item in status" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="4" align="right">
          <div class="grid-content bg-purple-light">
            <el-button @click="getLikeList" type="primary" round icon="el-icon-search">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!--查询结果 查询出点赞id 封面 电影名称 点赞数-->
    <el-card>
      <el-table :data="filmLikeList" stripe style="width: 100%">
        <el-table-column prop="likeId" label="#" width="100"></el-table-column>
        <el-table-column prop="imgUrl" label="封面" width="250">
          <template v-slot="scope">
            <el-image style="width: 100px; height: 130px" :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="filmName" label="电影名称" width="250"></el-table-column>
        <el-table-column prop="count" label="点赞数" width="250"></el-table-column>
        <el-table-column prop="isPopular" label="是否热门" width="250">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isPopular == 1" type="success">热门推流中</el-tag>
            <el-tag v-else type="danger">非热门</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="推流操作">
          <template slot-scope="scope">
            <el-button @click="openEditUI(scope.row.likeId)" type="primary" icon="el-icon-edit" circle
              size="mini"></el-button>
          </template>

        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>


    <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="likeForm" :label-position="labelPosition" ref="filmFormRef">

        <el-form-item label="是否推流" :label-width="formLabelWidth">
          <el-switch v-model="likeForm.isPopular" active-text="推上热门" inactive-text="取消热门" :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="popConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import likeApi from '@/api/likeManage'
export default {
  data() {
    return {
      searchModel: {
        pageNo: 1,
        pageSize: 10,
      },
      dialogFormVisible: false,
      total: 0,
      // 弹出对话框标题
      title: "",
      filmLikeList: [],

      // 更新pop信息相关设置
      likeForm: {},
      labelPosition: "top",
      formLabelWidth: '80px',
      status: [
        { value: 1, label: '热门推流中' },
        { value: 0, label: '非热门' }
      ],
    };
  },

  methods: {
    openEditUI(likeId) {
      this.title = '热门推流';
      likeApi.getLikeById(likeId).then(response => {
        this.likeForm = response.data;
      });

      this.dialogFormVisible = true;
    },
    popConfirm() {
      likeApi.updatePopInfo(this.likeForm).then(response => {
        console.log(this.likeForm, 'likeform');
        this.$message({
          message: response.message,
          type: 'success'
        });
        this.dialogFormVisible = false;
        this.getLikeList();
      });
    },
    clearForm() {
      this.likeForm = {};
      // this.$refs.filmFormRef.clearValidate();
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getLikeList();

    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getLikeList();
    },
    getLikeList() {
      likeApi.getLikeList(this.searchModel).then(Response => {
        this.filmLikeList = Response.data.rows;
        this.total = Response.data.total;
      });
    },
  },

  created() {
    this.getLikeList();
  }
};
</script>

<style>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>