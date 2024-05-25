<template>
    <div class="BigDiv">
        <Header></Header>

        <div class="others">
            <div class="Big_banner">
                <div class="slider">

                    <el-carousel :interval="4000" type="card">
                        <el-carousel-item v-for="image in images" :key="image.id">
                            <div class="carousel-card">
                                <img :src="require('@/assets/' + image.url)" alt="" class="carousel-image">
                            </div>
                        </el-carousel-item>
                    </el-carousel>


                </div>
                <div class="movie_box">

                    <div class="panel">
                        <div class="panel_header">
                            <span class="panel_title">
                                <span class="textcolor_red">
                                    <b>高赞喜欢</b>
                                </span>
                                <span class="panel_more">
                                    
                                        <span span>高赞热门分区</span>
                                    
                                </span>
                            </span>
                        </div>
                        <div class="HighScore">
                            <div class="HighScoreContainer">
                                <template v-for="likeMovie in filmLikeCount.data">

                                    <div class="HighScoreBox" @click="toFilmDetails(likeMovie.filmId)"
                                        :key="likeMovie.filmId">
                                        <div class="HighScoreBoxIn">
                                            <div class="HighScoreImgBox">
                                                <img :src="likeMovie.imgUrl">
                                            </div>
                                            <div class="HighScoreTitle">{{ likeMovie.filmName }}</div>
                                        </div>


                                    </div>
                                    <!-- <div v-else :key="likeMovie.likeId + '_else'"></div> -->
                                </template>
                            </div>
                        </div>
                        <div class="panel_header panel_headerYinpin">
                            <span class="panel_title">
                                <span class="textcolor_red">
                                    <b>影评专栏</b>
                                </span>
                                
                                <div class="IWantWrite" @click="toWrite()">我也想写影评<el-button
                                        icon="el-icon-chat-dot-round"></el-button></div>

                            </span>
                        </div>
                        <div class="FilmArticleBox">
                            <div class="FilmArticleMain">
                                <template v-for="(passage) in Article.slice(Math.max(Article.length - 3, 0))">
                                    <div class="ArticleBox" :key="passage.articleId" @click="toArticle(passage.articleId)">
                                        <div class="ArticleText">
                                            <div class="TextInTitle">{{ passage.title }}</div>
                                            <div class="TextInName">——关于《{{ passage.filmName }}》</div>
                                            <div class="TextInDes">{{ passage.description }}</div>
                                            <div class="TextAuthor">作者：{{ passage.userName }}</div>
                                        </div>
                                        <div class="ArticleImg">
                                            <img :src="require('@/assets/' + passage.url)" alt="Random Image">
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                        <div class="panel_header">
                            <span class="panel_title">
                                <span class="textcolor_red">
                                    <b>精选列表</b>
                                </span>
                                <span class="panel_more">
                                    
                                        <span span>已经精选上架的电影</span>
                                    
                                </span>
                            </span>
                        </div>
                        <div class="filmBigBox">
                            <ul class="filmAllUl">
                                <li class="filmAllLi" v-for="film in filmInfo.data" :key="film.filmId">
                                    <div class="filmBox" @click="toFilmDetails(film.filmId)">
                                        <div class="filmBoxImg">
                                            <img :src="film.imgUrl">
                                        </div>
                                        <div class="filmBoxTitle">
                                            {{ film.filmName }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>

        </div>


        <Footer></Footer>

    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import filmDetails from '@/api/filmManage'
import Header from "../indexPage/Header.vue";
import Footer from "../indexPage/Footer.vue";
import articlePass from '@/api/articleManage';
import likeApi from '@/api/likeManage';
import filmAuditApi from '@/api/auditManage'

export default {
    components: { Header, Footer },
    data() {
        return {
            filmInfo: {},
            images: [
                { id: 1, url: 'paper1.png' },
                { id: 2, url: 'paper2.png' },
                { id: 3, url: 'paper3.png' },
                { id: 4, url: 'paper4.png' },
                { id: 5, url: 'paper5.png' },
                { id: 6, url: 'paper6.png' }
            ],
            filmLikeCount: {},
            Article: [],
            imagePaths: [
                { id: 1, url: 'Picture1.jpg' },
                { id: 2, url: 'Picture2.jpg' },
                { id: 3, url: 'Picture3.jpg' },
                { id: 4, url: 'Picture4.jpg' },
                { id: 5, url: 'Picture5.jpg' },
                { id: 6, url: 'Picture6.jpg' },
                { id: 7, url: 'Picture7.jpg' },
                { id: 8, url: 'Picture8.jpg' },
            ]
        }
    },
    computed: {

    },
    created() {
        this.getFilmInfo()
        this.getFilmCountDetails()
        this.getArticle()
    },

    methods: {
        randomImageSource() {
            // 生成一个随机索引以选择随机图片
            const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
            return this.imagePaths[randomIndex].url;
        },
        getImagePath(imageName) {
            // 使用 require 动态加载图片
            return require(`@/assets/${imageName}`);
        },
        toLogin() {
            this.$router.push("/login")
        },
        toFilmDetails(filmId) {
            // this.$router.push("/filmDetails")
            this.$router.push({ name: 'filmDetails', params: { filmId: filmId } })
        },
        async getFilmInfo() {
            try {
                const response = await filmAuditApi.getAllFilmHaveUpload()
                this.filmInfo = response
            } catch (error) {
                console.error('电影信息获取失败', error)
            }
        },
        async getFilmCountDetails() {
            try {
                const response = await likeApi.getPopList()
                this.filmLikeCount = response
            } catch (error) {
                console.error('高赞电影信息获取失败', error)
            }
        },
        async getArticle() {
            try {
                const response = await articlePass.getAllArticleHaveUpload()
                // debugger
                this.Article = response.data
                if (this.Article) {

                    this.Article.forEach(item => {
                        item.url = this.randomImageSource()
                    })
                }
            } catch (error) {
                console.log('获取电影专栏文章失败', error)
            }
        },
        toArticle(ArticleId) {
            console.log(ArticleId)
            this.$router.push({ name: 'articleDetail', params: { articleId: ArticleId } })
        },
        toWrite() {
            this.$router.push({ name: 'editArticle' })
        }
    },

}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

::-webkit-scrollbar {
    // width: 36px;
    height: 12px;
}

::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    background-color: #768182;
}

.loginBtn {
    background-color: pink;

    ::v-deep i {
        color: red;
    }
}

.filmBigBox {
    // width: 98%; 
    margin: 10px auto;
    background-color: rgba(0, 0, 0, 0.078);
    /* border: 2px saddlebrown solid; */
    /* border-radius: 50px; */
    padding-bottom: 20px;
}

.filmAllUl {
    width: 1400px;
    margin: auto;
    padding: 10px 10px 10px 10px;

    // background-color: aqua;
    // overflow: hidden;
    // clear: both;
}

.filmAllUl::after {
    content: ".";
    display: block;
    clear: both;
    height: 0;
}

.filmAllLi {
    float: left;
    list-style: none;
    margin: 5px;
    // 这里怎么清除浮动

}

.filmBox {
    height: 350px;
    width: 220px;
    margin-top: 34px;
    // background-color: burlywood;
}

.filmBigBox :hover.filmBoxImg {
    // border: 3px solid rgb(55, 124, 198);
    box-shadow: 0 0 15px rgb(55, 124, 198);
    /* 添加阴影 */
}

.filmBoxImg {
    height: 300px;
    width: 220px;
    border-radius: 20px;
    background-color: white;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.6s;
}

.filmBoxImg img {
    transition: all 0.6s;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.filmBoxImg :hover {
    scale: 110%;
}

.filmBoxTitle {
    width: 220px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    line-height: 40px;
    color: white;
    margin-top: 7px;
    background-color: black;
    cursor: pointer;
}

// 处理代码开始
.BigDiv {
    background: linear-gradient(to bottom, #e1e6eb, #D8D2CB);
}

.others {
    width: 95%;
    margin: auto;
    // background-color: antiquewhite;
}


.el-main {
    background-color: #d3dce6;
    color: #333;
    /* line-height: 500px; */

    width: 100%;

}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    align-items: center;
}

.el-carousel__item:nth-child(2n) {
    // background-color: #99a9bf;
    background-color: #DBD2D3;

}

.el-carousel__item:nth-child(2n+1) {
    // background-color: #d3dce6;
    background-color: #BCADB2;

}

.Big_banner {
    // background-color: #333;
}

.slider {
    width: 80%;
    margin: auto;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 50px;
    border-bottom: 4px solid #806F82;
}

.movie_box {
    // width: 80%;
    margin: auto;
    margin-top: 30px;
    // background-color:#333;
}

.panel_title {
    height: 100px;
    line-height: 50px;
    padding-left: 30px;
    padding-right: 30px;

}

.textcolor_red {
    font-size: 25px;
}

.panel_more {
    display: inline-flex;
    float: right;
    margin-right: 100px;
}

.movie_poster {
    width: 220px;
    height: 280px;
    display: flex;
    margin-top: 20px;

}


.movie_score {
    float: right;
    display: inline-flex;
    margin-left: 20px;
}

.integer {
    font-size: 22px;
    color: goldenrod;
}

.faction {
    font-size: 18px;
    color: goldenrod;
}


// 处理代码结束

.HighScore {
    height: 450px;
    padding-top: 50px;
    display: flex;
    justify-content: space-around;
    padding-bottom: 40px;
    background-color: #d3dce6;
}

.HighScoreBox {
    // width: 30%;
    margin: auto;
    height: 200px;
    background-color: #475669;
    margin-top: 50px;
    cursor: pointer;
    transition: all 0.6s;
    margin-left: 30px;
    margin-right: 30px;
}

.HighScoreBox:hover {
    transform: scale(1.5);
    /* 放大 10% */
}

.HighScoreBox:hover .HighScoreTitle {
    opacity: 0;
    /* 隐藏标题 */
}

.HighScoreBox:hover .HighScoreImgBox {
    height: 200px;
}

.HighScoreBoxIn {
    width: 210px;
    transition: all 0.6s;

    position: relative;
    background-color: #806F82;
}

.HighScoreImgBox img {
    width: 100%;
    object-fit: cover;
}

.HighScoreImgBox {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    width: 210px;
    height: 130px;
    overflow: hidden;
}

.HighScoreTitle {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    text-align: center;
    font-size: 20px;
    color: whitesmoke;
    background-color: rgba(0, 0, 0, 0.5);
}

.HighScoreContainer {
    width: 85%;
    display: flex;
    overflow-x: auto;
    /* 横向滚动条 */
    white-space: nowrap;
    /* 防止内容换行 */
    // height: 200px; 
}

.el-carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.el-carousel .el-carousel__item.is-card .carousel-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.carousel-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.FilmArticleBox {
    height: 275px;
    padding-top: 40px;
    background-color: #BDAAAC;
}

.FilmArticleMain {
    display: flex;
    justify-content: space-between;
    height: 300px;
    width: 90%;
    margin: auto;
    // background-color: #806F82;
}

.ArticleBox {
    display: flex;
    height: 190px;
    width: 380px;
    // background-color: #806F82;
    cursor: pointer;
}

.ArticleText {
    width: 50%;
    height: 100%;
    padding-right: 8px;
    padding-left: 20px;
    background-color: #DBEAE0;
    scale: 1.2;
}

.TextInTitle {
    margin-top: 20px;
    font-size: 19px;
    font-weight: 600;
    height: 45px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
}

.TextInName {
    font-size: 13px;
    margin-top: 5px;
    text-align: right;
}

.TextInDes {
    margin-top: 20px;
    font-style: italic;
    font-size: 14px;
    height: 35px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;

}

.TextAuthor {
    margin-top: 8px;
}

.ArticleImg {
    width: 50%;
    height: 100%;
}

.ArticleImg img {
    width: 100%;
    height: 100%;
}

.panel_headerYinpin {
    position: relative;
}

.IWantWrite {
    position: absolute;
    top: 0px;
    right: 30px;
    height: 40px;
    width: 150px;
    text-align: center;
    height: 50px;
    color: #e1e6eb;
    background-color: #7B7283;
    border-radius: 10px;
    cursor: pointer;

    ::v-deep .el-button {
        color: white;
        // font-size: 20px;
        scale: 1.5;
        margin-left: 5px;
        background-color: transparent;
        border: transparent;
    }

    transition: all 0.3s;
}

.IWantWrite:hover {
    background-color: #B57672;
}</style>