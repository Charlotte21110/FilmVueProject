<template>
    <div>
        <el-card id="search">

            <el-row>
                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <el-select v-model="searchModel.status" clearable placeholder="审核情况">
                            <el-option v-for="item in statusInfo" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="4" align="right">
                    <div class="grid-content bg-purple-light">
                        <el-button @click="getAuditList" type="primary" round icon="el-icon-search">查询</el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>

        <el-card>
            <!-- 存放查询结果 -->
            <el-table :data="auditList" stripe style="width: 100%">
                <el-table-column prop="auditId" label="#" width="150"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="200"></el-table-column>
                <el-table-column prop="filmName" label="电影名称" width="200"></el-table-column>
                <el-table-column label="电影信息" width="200">
                    <template slot-scope="scope">
                        <el-button @click="showFilm(scope.row.auditId)">
                            显示内容
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" width="200">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === '审核通过'" type="success">审核通过</el-tag>
                        <el-tag v-else-if="scope.row.status === '待审核'" type="info">待审核</el-tag>
                        <el-tag v-else type="danger">审核未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="auditInfo" label="审核信息">
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="openEditUI(scope.row.auditId)" type="primary" icon="el-icon-search"
                            :disabled="scope.row.status !== '待审核'" size="mini">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-dialog title="电影数据" :visible.sync="innerVisible" append-to-body @close="clearAuditData">

            <el-table :data="filmManageList" stripe style="width: 100%">
                <el-table-column prop="filmName" label="电影名称" width="110"></el-table-column>
                <el-table-column prop="imgUrl" label="封面" width="110">
                    <template v-slot="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="filmArea" label="地区" width="110"></el-table-column>
                <el-table-column prop="filmCategory" label="风格" width="110"></el-table-column>
                <el-table-column prop="filmSummary" label="简介" width="600"></el-table-column>
                <el-table-column prop="duration" label="时长" width="110"></el-table-column>
                <el-table-column prop="releaseTime" label="上映时间" width="110"></el-table-column>
                <el-table-column prop="filmUrl" label="地址" width="600"></el-table-column>
            </el-table>

        </el-dialog>

        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">

            <el-form :model="auditForm">
                <el-form-item label="审核信息" label-width="80px">
                    <el-input v-model="auditForm.auditInfo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="审核状态" label-width="80px">
                    <el-switch v-model="auditForm.status" active-color="#13ce66" inactive-color="#ff4949"
                        :active-value="'审核通过'" :inactive-value="'审核不通过'">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="auditFilm(auditForm)">确认</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>

import auditApi from '@/api/auditManage'
import filmApi from '@/api/filmManage'

export default {
    data() {
        return {
            // 传输审核数据：审核状态和审核信息
            auditForm: {},
            searchModel: {
                pageNo: 1,
                pageSize: 10
            },
            auditList: [],
            filmManageList: [],

            total: 0,

            title: '',
            dialogFormVisible: false,
            innerVisible: false,

            statusInfo: [
                { value: '待审核', label: '待审核' },
                { value: '审核通过', label: '审核通过' },
                { value: '审核不通过', label: '审核不通过' },
            ],

        }
    },

    methods: {
        showFilm(auditId){
            this.innerVisible = true
            auditApi.getAuditById(auditId).then(res => {
                const filmId = res.data.filmId
                filmApi.getFilmById(filmId).then(response => {
                    this.filmManageList.push(response.data)
                })
            })
        },
        auditFilm(auditForm) {
            auditApi.auditFilm(auditForm).then(response => {
                console.log(this.filmForm, 'filmform');
                this.$message({
                    message: response.message,
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.getAuditList();
            });
        },
        getAuditList() {
            auditApi.getAuditList(this.searchModel).then(response => {
                this.auditList = response.data.rows;
                this.total = response.data.total;
            });
        },
        openEditUI(auditId) {
            this.title = '审核信息';
            this.dialogFormVisible = true;
            console.log(auditId);
            // 获取当前auditId的信息
            auditApi.getAuditById(auditId).then(response => {

                this.auditForm.auditId = response.data.auditId;
                this.auditForm.userId = response.data.userId;
                this.auditForm.filmId = response.data.filmId;
            });


        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getAuditList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getAuditList();
        },
        clearForm() {
            this.auditForm = {
                auditInfo: "",
                status: "审核不通过"
            };
        },
        clearAuditData() {
            this.filmManageList = [];
        }


    },

    created() {
        this.getAuditList()
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