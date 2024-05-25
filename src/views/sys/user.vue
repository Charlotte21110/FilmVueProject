<template>
    <div>
        <el-card id="search">

            <el-row>
                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchModel.userName" placeholder="用户名" clearable></el-input>
                        <el-input v-model="searchModel.userAccount" placeholder="账号" clearable></el-input>
                    </div>
                </el-col>
                <el-col :span="4" align="right">
                    <div class="grid-content bg-purple-light">
                        <el-button @click="getUserList" type="primary" round icon="el-icon-search">查询</el-button>
                        <el-button @click="openEditUI(null)" type="primary" icon="el-icon-plus" circle></el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>

        <el-card>
            <!-- 存放查询结果 -->
            <el-table :data="userList" stripe style="width: 100%">
                <el-table-column prop="userId" label="#" width="100">
                    <!-- {{ (searchModel.pageNo-1)*searchModel.pageSize + scope.$index + 1}} -->
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="100">
                </el-table-column>
                <el-table-column prop="userAccount" label="账号" width="100">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="100">
                </el-table-column>
                <el-table-column prop="description" label="个性签名" width="250">
                </el-table-column>
                <el-table-column prop="indexUrl" label="主页" width="100">
                </el-table-column>
                <el-table-column prop="artist" label="写手">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.artist == 1" type="success">写手</el-tag>
                        <el-tag v-else type="info">非写手</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="vip" label="会员">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.vip == 1" type="danger">大会员</el-tag>
                        <el-tag v-else>普通用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="openEditUI(scope.row.userId)" type="primary" icon="el-icon-edit" circle
                            size="mini"></el-button>
                        <el-button @click="deleteUser(scope.row.userId)" type="danger" icon="el-icon-delete" circle
                            size="mini"></el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-card>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="searchModel.pageNo" :page-sizes="[5, 10, 20, 50]" :page-size="searchModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 弹出对话框 -->
        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" ref="userFormRef">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="userForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户ID" :label-width="formLabelWidth">
                    <el-input v-model="userForm.userId" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="userForm.userAccount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" >
                    <el-input v-model="userForm.password"  autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="userForm.gender" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" :label-width="formLabelWidth">
                    <el-input v-model="userForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" :label-width="formLabelWidth" >
                    <el-checkbox-group 
                        v-model="userForm.roleIdList"
                        >
                        <el-checkbox v-for="role in roleList" :label="role.roleId" :key="role.roleId">{{role.roleDesc}}</el-checkbox>
                    </el-checkbox-group>
                 
                </el-form-item>
                <el-form-item label="会员" :label-width="formLabelWidth">
                    <el-switch v-model="userForm.vip" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                        :inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="写手" :label-width="formLabelWidth">
                    <el-switch v-model="userForm.artist" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                        :inactive-value="0">
                        <!-- 加冒号为变量，赋值 -->
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUser(userForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import userApi from '@/api/userManage'
import roleApi from '@/api/roleManage'
//要导入模版才可以用
export default {
    data() {
        return {
            roleList:[],
            formLabelWidth: '130px',
            userForm: {
                roleIdList: []
            },
            dialogFormVisible: false,
            title: "",
            total: 0,
            searchModel: {
                pageNo: 1,
                pageSize: 10
            },
            userList: []
        }
    },
    methods: 
    {
        getAllRoleList(){
            roleApi.getAllRoleList().then(response=>{
                this.roleList = response.data;
                console.log(this.roleList);
            })
        },
        async getUserInfo(userId) {
            try {
                const response = await userApi.getUserById(userId);
                const user = response.data;
                return user.userName;
            } catch (error) {
                console.error('获取用户信息失败:', error);
                return null;
            }
        },
        async deleteUser(userId) {
            const userName = await this.getUserInfo(userId);
            if (!userName) {
                // 获取 userName 失败，不执行删除操作
                return;
            }
            this.$confirm(`真的删除${userName}喵？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userApi.deleteUserById(userId).then(response => {
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                    this.getUserList();
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        saveUser() {
            this.$refs.userFormRef.validate((valid) => {
                if (valid) {
                    //提交请求给后台
                    console.log(this.userForm, 'userform')
                    userApi.saveUser(this.userForm).then(response => {
                        //要写回调函数
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        //刷新表格，vue里数据双向绑定，不需手动刷新
                        this.getUserList();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        clearForm() {
            this.userForm = {
                roleIdList:[]
            };
            this.$refs.userFormRef.clearValidate();
        },
        openEditUI(userId) {
            if (userId == null) {
                this.title = '新增用户';
            } else {
                this.title = '修改用户';
                //这个地方需要根据id查询用户
                userApi.getUserById(userId).then(response => {
                    this.userForm = response.data;
               
                });
            }

            this.dialogFormVisible = true;
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getUserList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getUserList();
        },
        getUserList() {
            userApi.getUserList(this.searchModel).then(response => {
                this.userList = response.data.rows;
                this.total = response.data.total;
            });
        },
    },
    created() {
        this.getUserList();
        this.getAllRoleList();
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
::v-deep .el-form-item__content {
    width: 520px; 
}
</style>