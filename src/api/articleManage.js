import request from '@/utils/request'

export default{
    
    addArticle(article){
        return request({
            url: '/article',
            method: 'post',
            data: article
        });
    },

    deleteArticleById(articleId) {
        return request({
          url: `/article/${articleId}`,
          method: 'delete'
        });
    },
    
    // 获取查询电影的参数 主要有电影名 地区 风格来查询
    getArticleManageList(searchModel){
        return request({
            url: '/article/list',
            method: 'get',
            params:{
                pageNo: searchModel.pageNo,
                pageSize: searchModel.pageSize,
                title: searchModel.title,
            }
        });
    },

    updateArticle(articleQueryVo) {
        return request({
            url: '/article',
            method: 'put',
            data: articleQueryVo
        });
    },
    
    getArticleById(articleId) {
        return request({
            url: `/article/${articleId}`,
            method: 'get',
        })
    },
    


    saveArticle(article){
        if(article.articleId == null || article.articleId == undefined){
            return this.addArticle(article);
        }
        return this.updateArticle(article);
    },
    
    getAllArticle(){
        return request({
            // url:`/article/list`,
            // params:{
            //     pageNo: 1,
            //     pageSize: 100,
            // },
            // method: 'get'
            url:'/article/confirmList',
            method: 'get'
        })
    },
    getAllArticleHaveUpload(){
        return request({
            url:'articleUpload/confirmList',
            method: 'get'
        })
    }


}