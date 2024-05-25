<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">想想看什么-影视推荐交流平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入管理员姓名" name="username" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码"
          name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="btnIndex">
        <el-button :loading="loading" type="primary" style="width:50%;margin-bottom:30px;"
          @click.native.prevent="handleLogin">登录</el-button>
        <el-button type="info" style="width:50%;margin-bottom:30px;"
          @click.native.prevent="() => openEditUI(null)">注册</el-button>
      </div>
      <div class="tips">
        <span style="margin-right:20px;">登陆使用更多后台功能</span>
        <span> (〃￣︶￣)人...(￣︶￣〃)</span>
        <div class="return" @click="returnIndex()">返回首页</div>
      </div>

    </el-form>
    <SignDialog  :visible.sync="dialogFormVisible.show"/>


  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

import SignDialog from './components/SignDialog.vue'

export default {
  name: 'Login',
  components:{
    SignDialog
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不可以少于六位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    
      dialogFormVisible:{
        show:false
      } ,

   
    }

  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openEditUI() {

      this.dialogFormVisible.show = true;
    },
    returnIndex(){
      this.$router.push('/move');
    }

  }


}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
   .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    ::v-deep input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #878787;
  // background-image: url(F:/Code/FilmProject/vueAdmin/vue-admin-template-4.4.0/public/image/background.jpg);
  background-image: url(/image/newBackgroundTwo.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.363);
    border-radius: 15px;
  }

  .tips {
    position: relative;
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
.tips:hover .return{
  // scale: 1.1;
  background-color: #CCDAE6;
  color: #666368;

}
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.btnIndex {
  display: flex;
}
.return {
  position: absolute;
    top: -19px;
    left: 338px;
    width: 113px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #666368;
    color: white;
    background-color: #e1bfa64d; 
    border-radius: 10px;
    cursor: pointer;
    -webkit-transition: all 0.6s;
    transition: all 0.6s;
}
</style>
