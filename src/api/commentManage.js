import request from "@/utils/request";

export default {
  saveComment(comment) {
    return request({
      url: "/comment",
      method: "post",
      data: comment,
    });
  },

  displayComment(filmId){
    return request({
      url: "/comment",
      method: "get",
      params:{
        filmId: filmId
      }
    });
  },

  deleteCommentById(commentId) {
    return request({
      url: `/comment/${commentId}`,
      method: "delete",
    });
  },

  getCommentManageList(searchModel) {
    return request({
      url: "/comment/list",
      method: "get",
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        userName: searchModel.userName,
      },
    });
  },

  getFilmById(filmId) {
    return request({
      url: `/film/${filmId}`,
      method: "get",
    });
  },

  getCommentAll(){
    return request({
      url:`/comment/list`,
      params:{
        pageNo:1,
        pageSize:100,
      },
      method: 'get'
    })
  }
};
