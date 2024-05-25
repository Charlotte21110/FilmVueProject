import request from "@/utils/request";

export default {
  getAuditList(searchModel) {
    return request({
      url: "/articleAudit/list",
      method: "get",
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        status: searchModel.status,
      },
    });
  },

  getAuditById(auditId) {
    return request({
      url: `/articleAudit/${auditId}`,
      method: "get",
    });
  },

  auditFilm(auditForm) {
    return request({
      url: "/articleAudit",
      method: "put",
      data: auditForm,
    });
  },
  getAllArticleHavePass(){
    return request({
      url: "/articleAudit/confirmList",
      method: "get"
    })
  }
};
