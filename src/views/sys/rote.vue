<template>
    <div>
        <el-card id="search">

            <el-row>
                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchModel.roleName" placeholder="角色名称" clearable></el-input>
                    </div>
                </el-col>
                <el-col :span="4" align="right">
                    <div class="grid-content bg-purple-light">
                        <el-button @click="getRoleList" type="primary" round icon="el-icon-search">查询</el-button>
                        <el-button @click="openEditUI(null)" type="primary" icon="el-icon-plus" circle></el-button>
                    </div>
                </el-col>
            </el-row>

        </el-card>

        <el-card>
            <!-- 存放查询结果 -->
            <el-table :data="roleList" stripe style="width: 100%">
                <el-table-column prop="roleId" label="角色ID" width="100">
                    <!-- {{ (searchModel.pageNo-1)*searchModel.pageSize + scope.$index + 1}} -->
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="100">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" width="130">
                </el-table-column>

                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="openEditUI(scope.row.roleId)" type="primary" icon="el-icon-edit" circle
                            size="mini"></el-button>
                        <el-button @click="deleteRole(scope.row.roleId)" type="danger" icon="el-icon-delete" circle
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
            <el-form :model="roleForm" ref="roleFormRef">
                <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
                    <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc" :label-width="formLabelWidth">
                    <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="权限设置" prop="menuIdList" :label-width="formLabelWidth">
                    <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
                </el-form-item> -->
                <!-- <el-tree :data="menuList" :props="menuProps" @node-click="handleNodeClick"></el-tree> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRole(roleForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import roleApi from '@/api/roleManage'
// import menuApi from '@/api/menuManage'

//要导入模版才可以用
export default {
    data() {
        return {
            menuList: [],
            menuProps: {

                children: 'children',
                label: 'title'
            },
            formLabelWidth: '250px',
            roleForm: {},
            dialogFormVisible: false,
            title: "",
            total: 0,
            searchModel: {
                pageNo: 1,
                pageSize: 10
            },
            roleList: [],
            rules: {
                roleName: [
                    { required: true, message: "请输入角色名称", trigger: "blur" },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在2到20个字符",
                        trigger: "blur",
                    },
                ],
                roleDesc: [
                    { required: true, message: "请输入角色描述", trigger: "blur" },
                    {
                        min: 2,
                        max:
                            20,
                        message:
                            "长度在2到20个字符",
                        trigger: "blur",
                    },
                ],

            }
        }
    },
    methods: {
        async getRoleInfo(roleId) {
            try {
                const response = await roleApi.getRoleById(roleId);
                const role = response.data;
                return role.roleName;
            } catch (error) {
                console.error('获取角色信息失败:', error);
                return null;
            }
        },
        async deleteRole(roleId) {
            const roleName = await this.getRoleInfo(roleId);
            if (!roleName) {
                // 获取 roleName 失败，不执行删除操作
                return;
            }
            this.$confirm(`真的删除${roleName}喵？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                roleApi.deleteRoleById(roleId).then(response => {
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                    this.getRoleList();
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        saveRole() {
            this.$refs.roleFormRef.validate((valid) => {
                if (valid) {
                    //提交请求给后台
                    console.log(this.roleForm, 'roleForm')
                    roleApi.saveRole(this.roleForm).then(response => {
                        //要写回调函数
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        //刷新表格，vue里数据双向绑定，不需手动刷新
                        this.getRoleList();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        clearForm() {
            this.roleForm = {};
            this.$refs.roleFormRef.clearValidate();
        },
        openEditUI(roleId) {
            if (roleId == null) {
                this.title = '新增角色';
            } else {
                this.title = '修改角色';
                //这个地方需要根据id查询角色
                console.log(roleId);
                roleApi.getRoleById(roleId).then(response => {
                    this.roleForm = response.data;
                });
            }

            this.dialogFormVisible = true;
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getRoleList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getRoleList();
        },
        getRoleList() {
            roleApi.getRoleList(this.searchModel).then(response => {
                this.roleList = response.data.rows;
                this.total = response.data.total;
            });
        },
    },
    created() {
        this.getRoleList();
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