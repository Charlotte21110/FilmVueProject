import request from '@/utils/request'


export default {
  getRoleList(searchModel) {
    return request({
      url: '/role/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        roleId: searchModel.roleId,
        roleName: searchModel.roleName,
        roleDesc: searchModel.roleDesc,
        // 好像上面只需要保留roleName
      }
    });
  },


  addRole(role) {

    return request({
      url: "/role",
      method: 'post',
      data: role
    });
  },


  updateRole(role) {
    return request({
      url: '/role',
      method: 'put',
      data: role
    });
  },
  saveRole(role) {
    if (role.roleId == null || role.roleId == undefined) {

      return this.addRole(role); //需要一个roleList
    }
    return this.updateRole(role);
  },
  getRoleById(roleId) {
    return request({
      url: `/role/${roleId}`,
      method: 'get',
    });
  },
  deleteRoleById(roleId) {
    return request({
      url: `/role/${roleId}`,
      method: 'delete'
    });
  },

  getAllRoleList() {
    return request({
      url: '/role/all',
      method: 'get'
    });
  },
  getAllRoleList() {
    return request({
      url: '/role/all',
      method: 'get'
    });
  },
}