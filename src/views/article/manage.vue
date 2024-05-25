<template>
  <div>
    <!--下拉式选项 选择电影地区和风格进行搜索-->
    <el-card id="search">

      <el-row>

        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-input v-model="searchModel.title" placeholder="标题"></el-input>
            <el-input v-model="searchModel.filmName" placeholder="电影名"></el-input>
          </div>
        </el-col>

        <el-col :span="4" align="right">
          <div class="grid-content bg-purple-light">
            <el-button @click="getArticleManageList" type="primary" round icon="el-icon-search">搜索</el-button>
            <el-button @click="openEditUI(null)" type="primary" icon="el-icon-plus" circle></el-button>
          </div>
        </el-col>

      </el-row>

    </el-card>

    <!--查询结果 查询出影评id 标题 内容 电影名称 发布人 发布时间-->
    <el-card>
      <el-table :data="articleManageList" stripe style="width: 100%">
        <el-table-column prop="articleId" label="#" width="50"></el-table-column>
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="description" label="简介" width="150"></el-table-column>
        <el-table-column prop="article" label="内容" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="showArticle(scope.row.article)">
              显示内容
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="article" label="详情页" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="$router.push({ name: 'articleDetail', params: { articleId: scope.row.articleId } })">
              页面展示
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="发布人" width="80"></el-table-column>
        <el-table-column prop="filmName" label="电影名" width="180"></el-table-column>
        <el-table-column prop="time" label="发布时间" width="180"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="openEditUI(scope.row.articleId, scope.row.article)" type="primary" icon="el-icon-edit" circle
              size="mini"></el-button>
            <el-button @click="deleteArticle(scope.row.articleId)" type="danger" icon="el-icon-delete" circle
              size="mini"></el-button>
          </template>

        </el-table-column>
      </el-table>
    </el-card>

    <!--分页-->

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="articleForm" :label-position="labelPosition" ref="filmFormRef">

        <el-form-item label="电影名" :label-width="formLabelWidth" prop="filmName">
          <el-input v-model="articleForm.filmName" autocomplete="off" placeholder="请输入电影名称"></el-input>
        </el-form-item>

        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="articleForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="简介" :label-width="formLabelWidth" prop="description">
          <el-input v-model="articleForm.description" placeholder="请输入简介"></el-input>
        </el-form-item>

        <el-form-item label="内容" :label-width="formLabelWidth" prop="article">
          <div id="editor"></div>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveArticle()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="articleVisible" title="影评内容">
      <div class="w-e-text">
        <div v-html="article"></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="articleVisible = false">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import articleApi from '@/api/articleManage'
import E from 'wangeditor'
import hljs from 'highlight.js'

export default {
  data() {

    return {

      searchModel: {
        pageNo: 1,
        pageSize: 10
      },
      articleForm: {},
  
      labelPosition: "top",
      dialogFormVisible: false,
      formLabelWidth: '80px',
      // 分页记录数
      total: 0,
      // 弹出对话框标题
      title: "",

      articleManageList: [],
      editor: null,
      article: '',
      articleVisible: false,
    }
  },

  methods: {

    async deleteArticle(articleId) {
      this.$confirm(`请确认是否删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.deleteArticleById(articleId).then(response => {
          this.$message({
            type: 'success',
            message: response.message
          });
          this.getArticleManageList();
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },

    showArticle(article){
      this.article = article;
      this.articleVisible = true;
    },

    openEditUI(articleId, article) {
      if (articleId == null) {
        this.title = '新增影评';
      } else {
        this.title = '修改影评';
        articleApi.getArticleById(articleId).then(response => {
          this.articleForm = response.data;
        });
      }
      this.dialogFormVisible = true;
      // 等待页面元素加载完毕再创建编辑框
      this.$nextTick(() => {
        this.editor = new E('#editor');
        // 代码高亮
        this.editor.highlight = hljs;
        this.editor.config.uploadImgServer = process.env.VUE_APP_BASE_API + '/file/editorUpload';
        this.editor.config.uploadFileName = 'file';
        this.editor.create();
        // 获取影评内容
        this.editor.txt.html(article);
      });
    },
    saveArticle() {
      this.$refs.filmFormRef.validate((valid) => {
        if (valid) {
          // 获取编辑器内容
          let content = this.editor.txt.html();
          this.articleForm.article = content;
          articleApi.saveArticle(this.articleForm).then(response => {
            console.log(this.articleForm, 'articleForm');
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.getArticleManageList();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    clearForm() {
      this.articleForm = {};
      // 销毁编辑器
      this.editor.destroy();
      this.editor = null;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getArticleManageList();

    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getArticleManageList();
    },
    getArticleManageList() {
      articleApi.getArticleManageList(this.searchModel).then(Response => {
        this.articleManageList = Response.data.rows;
        this.total = Response.data.total;
      });
    },

  },

  // 构造函数 进来就调用查询电影
  created() {
    this.getArticleManageList();

  }
}
</script>

<style lang="scss" scoped>
#search .el-select {
  width: 200px;
  padding-right: 30px;
}

#search .el-input {
  width: 200px;
  margin-right: 10px;
}

.el-dialog .el-input {
  width: 50%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>