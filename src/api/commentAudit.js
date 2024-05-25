import request from "@/utils/request";

export default {
  getAuditList(searchModel) {
    return request({
      url: "/commentAudit/list",
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
      url: `/commentAudit/${auditId}`,
      method: "get",
    });
  },

  auditComment(auditForm) {
    return request({
      url: "/commentAudit",
      method: "put",
      data: auditForm,
    });
  },
};
