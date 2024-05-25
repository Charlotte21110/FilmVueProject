<template>
  <div>
    <template v-for="user in userInfo.rows">


      <div class="dashboard-container" v-if="user.userName === thisName" :key="user.userId">
        <div class="return" @click="returnIndex()">返回主页</div>
        <div class="dashboard-text">欢迎，{{ name }}</div>
        <div class="line"></div>
        <div class="dashboardMyText"><div class="MyTextbox">UID</div> {{ user.userId }}</div>
        <div class="dashboardMyText"><div class="MyTextbox">个人码: </div>{{ user.userAccount }}</div>
        <div class="dashboardMyText"><div class="MyTextbox">昵称：</div> {{ user.userName }}</div>
        <div class="dashboardMyText"><div class="MyTextbox">性别：</div> {{ user.gender }}</div>
        <div class="dashboardMyText"><div class="MyTextbox">个性签名：</div> {{ user.description }}</div>


      </div>
    </template>
    <p></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userManage from '@/api/userManage'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      userInfo: {},
      thisName: ''
    }
  },
  async created() {
    await this.getUser(),
      this.thisName = this.name
  },
  methods: {
    returnIndex() {
      this.$router.push('/move');
    },
    async getUser() {
      try {
        const response = await userManage.getUserAll()
        this.userInfo = response.data
      } catch (error) {
        console.log('用户获取失败', error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.return {
  height: 50px;
  width: 200px;
  background-color: #AC9B93;
  color: white;
  font-size: 20px;
  line-height: 50px;
  text-align: center;

  cursor: pointer;
}
.dashboardMyText {
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  margin-top: 5px;
  // background-color: aqua;
  clear: both;
}
.MyTextbox {
  display: block;
  float: left;
  width: 120px;
  // text-align: center;
  padding-left: 25px;
  margin-right: 20px;
  background-color: #F4F1E9;
  border-radius: 10px;
  font-weight: 500;
}
.line {
  border:3px solid #BEAAB3;
}
.dashboard-text {
  margin-top: 20px;
  
}
</style>
