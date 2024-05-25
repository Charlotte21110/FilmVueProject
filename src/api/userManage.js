import request from '@/utils/request'


export default {
  getUserList(searchModel) {
    return request({
      url: '/user/list',
      method: 'get',
      params: {
        // get是传送不了json的，所以不能像上面那样子直接写一个data进去，这里要写参数
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        userName: searchModel.userName,
        userAccount: searchModel.userAccount,
        gender: searchModel.gender,
        indexUrl: searchModel.indexUrl,
        vip: searchModel.vip,
        artist: searchModel.artist,
        userId: searchModel.userId,
        password: searchModel.password,
        roleId: searchModel.roleId
      }
    });
  },
  getUserAll(){
    return request({
      url:'/user/list?pageNo=1&pageSize=100',
      method:'get'
  })
  }
,
  addUser(user) {

    // const maxUserId = Math.max(...this.getuserList.map(user => parseInt(user.userId)));
    // const newUserId = '000' + (maxUserId + 1).toString();
    // user.userId = newUserId;
    // console.log(newUserId);
    return request({
      url: "/user",
      method: 'post',
      data: user
    });
  },


  updateUser(user) {
    return request({
      url: '/user',
      method: 'put',
      data: user
    });
  },
  saveUser(user) {
    if (user.userId == null || user.userId == undefined) {

      return this.addUser(user); //需要一个userList
    }
    return this.updateUser(user);
  },
  getUserById(userId) {
    return request({
      url: `/user/${userId}`,
      method: 'get',
    });
  },
  deleteUserById(userId) {
    return request({
      url: `/user/${userId}`,
      method: 'delete'
    });
  },
  getCurrentUser(){
    return request({
      url: '/user/current',
      method: 'get'
    });
  }

}