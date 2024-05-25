import request from '@/utils/request'

export default{
    getUploadList(searchModel){
        return request({
            url: '/articleUpload/list',
            method: 'get',
            params:{
                pageNo: searchModel.pageNo,
                pageSize: searchModel.pageSize,
                uploadStatus: searchModel.uploadStatus
            }
        });
    },

    getUploadConfirmList(){
        return request({
            url: '/articleUpload/confirmList',
            method: 'get',
        });
    },
        
    uploadArticle(uploadForm){
        return request({
            url: '/articleUpload',
            method: 'put', 
            data: uploadForm,
        });
    },

    getUploadArticleById(uploadId){
        return request({
            url: `/articleUpload/${uploadId}`,
            method: 'get',
        });
    }
    

}