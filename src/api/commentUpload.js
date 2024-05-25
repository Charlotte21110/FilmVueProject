import request from '@/utils/request'

export default{
    getUploadList(searchModel){
        return request({
            url: '/commentUpload/list',
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
            url: '/commentUpload/confirmList',
            method: 'get',
        });
    },
        
    uploadComment(uploadForm){
        return request({
            url: '/commentUpload',
            method: 'put', 
            data: uploadForm,
        });
    },

    getUploadCommentById(uploadId){
        return request({
            url: `/commentUpload/${uploadId}`,
            method: 'get',
        });
    }
    

}