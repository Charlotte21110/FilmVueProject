import request from '@/utils/request'

export default{
    

    addFilm(filmQueryVo){
        return request({
            url: '/film',
            method: 'post',
            data: filmQueryVo
        });
    },

    deleteFilmById(filmId) {
        return request({
          url: `/film/${filmId}`,
          method: 'delete'
        });
    },
    
    // 获取查询电影的参数 主要有电影名 地区 风格来查询
    getFilmManageList(searchModel){
        return request({
            url: '/film/list',
            method: 'get',
            params:{
                pageNo: searchModel.pageNo,
                pageSize: searchModel.pageSize,
                filmName: searchModel.filmName,
                filmArea: searchModel.filmArea,
                filmCategory: searchModel.filmCategory
            }
        });
    },

    updateFilm(filmQueryVo) {
        return request({
            url: '/film',
            method: 'put',
            data: filmQueryVo
        });
    },
    
    getFilmById(filmId) {
        return request({
            url: `/film/${filmId}`,
            method: 'get',
        })
    },
    


    saveFilm(filmQueryVo){
        if(filmQueryVo.filmId == null || filmQueryVo.filmId == undefined){
            return this.addFilm(filmQueryVo);
        }
        return this.updateFilm(filmQueryVo);
    },
     // 10.9添加的获取所有电影
     getFilmMessage(){
        return request({
            url: '/audit/confirmList',
            method:'get'
   
        })
    },
    getFilmCount(filmId){
        return request({
            url:`/like/filmId/${filmId}`,
            method:'get'
        })
    },
    toLikeMovie(filmId){
        return request({

            url:`/like/count`,
            params:{
                filmId: filmId,
            },
            method:'put'
        })
    }
    


}