import request from '@/utils/request'

export default{
    getLikeList(searchModel){
        return request({
            url: `/like/list`,
            method: 'get',
            params:{
                pageNo: searchModel.pageNo,
                pageSize: searchModel.pageSize,
                isPopular: searchModel.isPopular
            }
        });
    },

    getPopList(){
        return request({
            url: `/like/popList`,
            method: 'get',
        });
    },

    updatePopInfo(LikeFilm){
        return request({
            url: `/like`,
            method: 'put',
            data: LikeFilm
        });
    },

    getLikeById(likeId) {
        return request({
            url: `/like/${likeId}`,
            method: 'get',
        });
    },
    

}