<template>
    <div>
        <el-card id="search">

            <el-row>
                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <el-select v-model="searchModel.uploadStatus" clearable placeholder="是否上架">
                            <el-option v-for="item in statusInfo" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4" align="right">
                    <div class="grid-content bg-purple-light">
                        <el-button @click="getUploadList" type="primary" round icon="el-icon-search">查询</el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>

        <el-card>
            <!-- 存放查询结果 -->
            <el-table :data="uploadList" stripe style="width: 100%">
                <el-table-column prop="uploadId" label="#" width="150"></el-table-column>
                <el-table-column prop="imgUrl" label="封面" width="200">
                    <template v-slot="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
                <el-table-column prop="filmName" label="电影名称" width="200"></el-table-column>
                <el-table-column prop="uploadStatus" label="状态" width="200">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.uploadStatus === '已上架'" type="success">已上架</el-tag>
                        <el-tag v-else type="danger">未上架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="openEditUI(scope.row.uploadId)" type="primary" icon="el-icon-search"
                         size="mini">上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>


        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">

            <el-form :model="uploadForm" label-position="top">
                <el-form-item label="是否上架" label-width="80px">
                    <el-switch v-model="uploadForm.uploadStatus" active-text="精选上架" inactive-text="取消精选上架" :active-value="'已上架'"
            :inactive-value="'未上架'">
          </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="uploadFilm(uploadForm)">确认</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>

import uploadApi from '@/api/filmUpload'

export default {
    data() {
        return {
            // 传输审核数据：审核状态和审核信息
            uploadForm: {},
            searchModel: {
                pageNo: 1,
                pageSize: 10
            },
            uploadList: [],

            total: 0,

            title: '',
            dialogFormVisible: false,

            statusInfo: [
                { value: '已上架', label: '已上架' },
                { value: '未上架', label: '未上架' },
            ],

        }
    },

    methods: {
        uploadFilm(uploadForm) {
            uploadApi.uploadFilm(uploadForm).then(response => {
                console.log(this.uploadForm, 'uploadForm');
                this.$message({
                    message: response.message,
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.getUploadList();
            });
        },
        getUploadList() {
            uploadApi.getUploadList(this.searchModel).then(response => {
                this.uploadList = response.data.rows;
                this.total = response.data.total;
            });
        },
        openEditUI(uploadId) {
            this.title = '上架操作';
            this.dialogFormVisible = true;
            console.log(uploadId);
            uploadApi.getUploadFilmById(uploadId).then(res => {
                this.uploadForm = res.data
            })
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getUploadList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getUploadList();
        },
        clearForm() {
            this.uploadForm = {
                uploadStatus: "未上架"
            };
        },

    },

    created() {
        this.getUploadList()
    }
}
</script>

<style lang="scss" scoped>
#search .el-input {
    width: 400px;
    padding-right: 50px;
}

.el-dialog .el-input {
    width: 70%;
}
</style>