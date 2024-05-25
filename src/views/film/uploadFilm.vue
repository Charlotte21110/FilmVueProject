<template>
    <div>
        <el-card id="search">

            <el-row>

                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <el-select v-model="searchModel.filmArea" clearable placeholder="地区">
                            <el-option v-for="item in area" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="searchModel.filmCategory" clearable placeholder="风格">
                            <el-option v-for="item in category" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="4" align="right">
                    <div class="grid-content bg-purple-light">
                        <el-button @click="getFilmManageList" type="primary" round icon="el-icon-search">搜索</el-button>
                        <el-button @click="openEditUI(null)" type="primary" icon="el-icon-plus" circle></el-button>
                    </div>
                </el-col>

            </el-row>

        </el-card>

        <!--查询结果 查询出电影id 电影名称 导演 地区 风格 地址-->
        <el-card>
            <el-table :data="filmManageList" stripe style="width: 100%">
                <el-table-column prop="filmId" label="电影ID" width="110"></el-table-column>
                <el-table-column prop="imgUrl" label="封面" width="110">
                    <template v-slot="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="上传用户名" width="110"></el-table-column>
                <el-table-column prop="filmName" label="电影名称" width="110"></el-table-column>
                <el-table-column prop="filmArea" label="地区" width="110"></el-table-column>
                <el-table-column prop="filmCategory" label="风格" width="110"></el-table-column>
                <el-table-column prop="auditInfo" label="审核信息" width="200"></el-table-column>
                <el-table-column prop="status" label="审核状态" width="110">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === '审核通过'" type="success">审核通过</el-tag>
                        <el-tag v-else-if="scope.row.status === '待审核'">待审核</el-tag>
                        <el-tag v-else type="danger">审核未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="filmUrl" label="地址"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="openEditUI(scope.row.filmId)" type="primary" icon="el-icon-edit" circle
                            size="mini"></el-button>
                        <el-button @click="deleteFilm(scope.row.filmId)" type="danger" icon="el-icon-delete" circle
                            size="mini"></el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>

        <!--分页已经删除-->

        

        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="filmForm" :label-position="labelPosition" ref="filmFormRef">

                <el-form-item label="电影名称" :label-width="formLabelWidth" prop="filmName">
                    <el-input v-model="filmForm.filmName" autocomplete="off" placeholder="请输入电影名称"></el-input>
                </el-form-item>

                <el-form-item label="地区" :label-width="formLabelWidth" prop="area">
                    <el-select v-model="filmForm.filmArea" clearable placeholder="请选择电影地区">
                        <el-option v-for="item in area" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="风格" :label-width="formLabelWidth" prop="category">
                    <el-select v-model="filmForm.filmCategory" clearable placeholder="请选择电影风格">
                        <el-option v-for="item in category" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资源地址" :label-width="formLabelWidth" prop="filmUrl">
                    <el-input v-model="filmForm.filmUrl" placeholder="请输入资源地址"></el-input>
                </el-form-item>

                <el-form-item label="导演" :label-width="formLabelWidth" prop="director">
                    <el-input v-model="filmForm.director" placeholder="请输入导演名称"></el-input>
                </el-form-item>

                <el-form-item label="主演" :label-width="formLabelWidth" prop="starting">
                    <el-input v-model="filmForm.startingName" placeholder="请输入主演名称"></el-input>
                </el-form-item>

                <el-form-item label="电影时长" :label-width="formLabelWidth" prop="duration">
                    <el-input v-model="filmForm.duration" placeholder="请输入电影时长"></el-input>
                </el-form-item>

                <el-form-item label="电影上映时间" :label-width="formLabelWidth" prop="releaseTime">
                    <el-date-picker v-model="filmForm.releaseTime" type="date" :picker-options="pickerOptions"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="封面" :label-width="formLabelWidth" prop="imgUrl">
                    <el-upload class="avatar-uploader" action="http://localhost:9999/file/upload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="电影简介" :label-width="formLabelWidth" prop="summary">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入电影简介" maxlength="255"
                        show-word-limit v-model="filmForm.filmSummary">
                    </el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFilm()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

import filmApi from '@/api/filmManage'
import { mapGetters } from 'vuex'

export default {
    data() {

        return {
            searchModel: {
                pageNo: 1,
                pageSize: 100
            },
            filmForm: {},
            imageUrl: '',

            labelPosition: "top",
            dialogFormVisible: false,
            formLabelWidth: '80px',
            // 分页记录数
            total: 0,
            // 弹出对话框标题
            title: "",

            filmManageList: [],
            area: [
                { value: '中国港台', label: '中国港台' },
                { value: '中国大陆', label: '中国大陆' },
                { value: '美国', label: '美国' },
                { value: '日本', label: '日本' },
                { value: '韩国', label: '韩国' },
                { value: '法国', label: '法国' },
                { value: '英国', label: '英国' },
                { value: '德国', label: '德国' },
                { value: '泰国', label: '泰国' },
                { value: '意大利', label: '意大利' },
                { value: '西班牙', label: '西班牙' },
                { value: '其他', label: '其他' }
            ],
            category: [
                { value: '短片', label: '短片' },
                { value: '剧情', label: '剧情' },
                { value: '喜剧', label: '喜剧' },
                { value: '爱情', label: '爱情' },
                { value: '动作', label: '动作' },
                { value: '恐怖', label: '恐怖' },
                { value: '科幻', label: '科幻' },
                { value: '犯罪', label: '犯罪' },
                { value: '惊悚', label: '惊悚' },
                { value: '悬疑', label: '悬疑' },
                { value: '奇幻', label: '奇幻' },
                { value: '战争', label: '战争' },
                { value: '动画', label: '动画' },
                { value: '传记', label: '传记' },
                { value: '家庭', label: '家庭' },
                { value: '歌舞', label: '歌舞' },
                { value: '历史', label: '历史' },
                { value: '冒险', label: '冒险' },
                { value: '纪实', label: '纪实' },
                { value: '灾难', label: '灾难' },
                { value: '漫画改', label: '漫画改' },
                { value: '小说改', label: '小说改' }
            ],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            thisName: ''
        }
    },
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    mounted(){
        this.thisName = this.name;
    },
    methods: {
        async deleteFilm(filmId) {
            this.$confirm(`请确认是否删除`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                filmApi.deleteFilmById(filmId).then(response => {
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                    this.getFilmManageList();
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        openEditUI(filmId) {
            if (filmId == null) {
                this.title = '新增电影';
            } else {
                this.title = '修改电影';
                filmApi.getFilmById(filmId).then(response => {
                    this.filmForm = response.data;
                });
            }
            this.dialogFormVisible = true;
        },
        saveFilm() {
            this.$refs.filmFormRef.validate((valid) => {
                if (valid) {
                    filmApi.saveFilm(this.filmForm).then(response => {
                        console.log(this.filmForm, 'filmform');
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.imgUrl = '';
                        this.getFilmManageList();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        clearForm() {
            this.filmForm = {};
            this.$refs.filmFormRef.clearValidate();
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getFilmManageList();

        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getFilmManageList();
        },
        getFilmManageList() {
            filmApi.getFilmManageList(this.searchModel).then(response => {
                const allFilms = response.data.rows;
                this.filmManageList = allFilms.filter(film =>film.userName === this.thisName);
                this.total = this.filmManageList.length;
            });
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);

            this.filmForm.imgUrl = res.data;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        }
    },

    // 构造函数 进来就调用查询电影
    created() {
        this.getFilmManageList();
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