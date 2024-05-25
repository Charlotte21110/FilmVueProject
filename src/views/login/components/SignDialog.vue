<template>
    <el-dialog @close="()=>clearForm()"  :title="title" :visible.sync="visible">
        <el-form :model="userForm" ref="userFormRef">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="userForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="用户ID" :label-width="formLabelWidth">
                    <el-input v-model="userForm.userId" autocomplete="off"></el-input>
                </el-form-item> -->
            <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="userForm.userAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="userForm.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="userForm.gender" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" :label-width="formLabelWidth">
                <el-input v-model="userForm.description" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="() => clearForm()">取 消</el-button>
            <el-button type="primary" @click="saveUser(userForm)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {sign} from '@/api/user'
export default {
    props:{
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '注册'
        }
    },

    data() {
        return {
            userForm: {},
            formLabelWidth: '130px'
        }
    },

    methods: {
        saveUser() {
            this.$refs.userFormRef.validate((valid) => {
                if (valid) {
                    //提交请求给后台
                    // console.log(this.userForm, 'userform')
                    sign(this.userForm).then(response => {
                        //要写回调函数
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        this.clearForm()
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        clearForm() {
            this.userForm = {};
            this.$refs.userFormRef.clearValidate();
       
            this.$emit('update:visible', false)
        },
    },
}
</script>

<style lang="scss" scoped>
   .el-input {
    width: 70%;
    min-width: 200px;
   }
</style>