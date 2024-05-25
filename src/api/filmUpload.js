import request from '@/utils/request'

export default{
    getUploadList(searchModel){
        return request({
            url: '/filmUpload/list',
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
            url: '/filmUpload/confirmList',
            method: 'get',
        });
    },
        
    uploadFilm(uploadForm){
        return request({
            url: '/filmUpload',
            method: 'put', 
            data: uploadForm,
        });
    },

    getUploadFilmById(uploadId){
        return request({
            url: `/filmUpload/${uploadId}`,
            method: 'get',
        });
    }
    

}