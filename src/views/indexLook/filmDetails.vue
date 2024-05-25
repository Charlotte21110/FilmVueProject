<template>
    <div class="BigDiv">
        <nav>
            <div class="navbar">
                <div class="navbar-left" @click="returnIndex()">
                    <span class="website-name">返回想想看什么主页</span>
                </div>
                
            </div>
        </nav>
        <main>
            <div class="bigBox">
                <div class="LeftNav">
                    <ul class="FilmNavUl">
                        <li class="FilmNavli liactive"><i class="el-icon el-icon-video-camera-solid"></i>影片详情</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-document-delete"></i>免费专区</li>
                        <li class="FilmNavli"><i class="el-icon-s-help"></i>会员影片</li>
                        <br>
                        <li class="FilmNavli"><i class="el-icon el-icon-more"></i>热门影评</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-fork-spoon"></i>动作</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-cold-drink"></i>爱情</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-watermelon"></i>动漫</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-s-open"></i>科幻</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-search"></i>历史记录</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-chat-line-round"></i>留言求片</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-s-data"></i>排行榜</li>
                        <li class="FilmNavli"><i class="el-icon el-icon-coin"></i>原神</li>
                    </ul>
                </div>

                <div class="RightMain">
                    <template>
                        <div class="MainSummaryTop">

                            <div class="MainSuTopL">
                                <div class="title">{{ filmInfo.filmName }}</div>
                                <div class="tag">{{ filmInfo.filmCategory }}</div>
                                <div class="summary">{{ filmInfo.filmSummary }}</div>
                                <div class="any"><span>时间：</span>{{ filmInfo.releaseTime }}</div>
                                <div class="any"><span>地区：</span>{{ filmInfo.filmArea }}</div>
                                <div class="any"><span>导演：</span>{{ filmInfo.director }}</div>
                                <div class="any"><span>主演：</span>{{ filmInfo.startingName }}</div>
                                <div class="any"><span>时长：</span>{{ filmInfo.duration }}</div>
                                <div class="any"><span>链接：</span>{{ filmInfo.filmUrl }}</div>
                                <div class="score">评分：9.0</div>
                                <div class="btnBox">
                                    <div class="btnBoxLeft">
                                        <el-button class="btnOrigin" icon="el-icon-video-camera"
                                            @click="toLookMovie()">立即播放</el-button>
                                        <el-button class="btnRed" @click="toBtnLike(filmInfo.filmId)"
                                            icon="el-icon-thumb">点赞</el-button>
                                        <div class="seeMovieBox" v-show="isMovieBoxVisible">
                                            <div class="closeMovie"><el-button class="closeMovieBut" icon="el-icon-close"
                                                    @click="toCloseMovie()"></el-button></div>
                                            <div class="MovieBig">
                                                <iframe :src="filmInfo.filmUrl" scrolling="no" border="0" frameborder="no"
                                                    framespacing="0" width="100%" height="100%" allowfullscreen="true">
                                                </iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <template>
                                        <div>
                                            <div class="btnBoxRight">点赞：{{
                                                filmCount.count }} 人次
                                            </div>
                                            <!-- <div v-else :key="filmCount.likeId + '_else'"></div> -->
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div class="MainSuTopR">
                                <img :src="filmInfo.imgUrl">
                            </div>


                        </div>
                    </template>
                    <div class="MainSummaryButtom">
                        <div class="MSBtitle">
                            讨论
                        </div>
                        <div class="UserLogin">
                            <div class="head">
                                <img src="/image/marisa.jpg" width="100%">
                            </div>
                            <div class="inputBox">
                                <input class="inputBoxTest" type="text" placeholder="请输入评论" v-model="comment.comment">
                            </div>

                            <div class="submitBox">
                                <div @click="submit">提交</div>
                            </div>
                            <!-- <div class="loginAfter">
                                登录后才可以发言喵
                            </div> -->
                        </div>
                        <div class="discusstag">
                            <div :class="{'new':!isGoodCommentActive,'hot':isGoodCommentActive}" @click="seeGoodComment()">
                                精选
                            </div>
                            <div :class="{'new':isGoodCommentActive,'hot':!isGoodCommentActive} "  @click="seeAllComment()">
                                全部
                            </div>
                        </div>
                        <div class="submitLook" v-show="isAllCommentBoxVisible" ref="bottomElement">
                            <template v-if="Mycomment.rows">
                                <div v-for="comments in Mycomment.rows" class="submitContentTwo" v-if=" comments.filmId===thisfilmId" :key="comments.commentId">{{comments.userName}}
                                    <div class="circleTwo"></div>
                                    <span class="ManContentTwo"></span>说：
                                    <span class="ManContentDet">{{comments.comment}}</span>
                                </div>
                            </template>
                        </div>
                        <div class="goodComment" v-show="isGoodCommentBoxVisible">
                            
                            <template v-if="MyGoodComment" >
                                <div class="submitContent" v-for="commentses in MyGoodComment.comments" :key="commentses.commentId">
                                    {{ commentses.userName }}
                                    <div class="circle"></div>
                                    <span class="ManContent"></span>说：
                                    <span class="ManContentDet">{{ commentses.comment }}</span>
                                </div>
                            </template>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
        <!-- <footer></footer> -->
    </div>
</template>

<script>
import filmDetails from '@/api/filmManage'
import userManage from '@/api/userManage'
import { Message } from 'element-ui'
import commentManage from '@/api/commentManage'
export default {
    data() {
        return {
            filmInfo: {},
            thisfilmId: '',
            imageUrl: '',
            filmCount: {},
            isLike: false,
            comment: {
                comment: '',
            },
            // 展示用
            comments: [],
            userInfo: {},
            isMovieBoxVisible: false,
            Mycomment: {},
            isAllCommentBoxVisible: false,
            isGoodCommentBoxVisible: true,
            isGoodCommentActive: true,
            MyGoodComment: {}


        }
    },
    created() {
        this.thisfilmId = this.$route.params.filmId;
        this.getFilmInfo();
        this.getCurrentUser();
        this.showComment();
        this.showGoodComment();
    },
    methods: {
        async getCurrentUser() {
            try {
                const response = await userManage.getCurrentUser()
                this.userInfo = response.data
            } catch (error) {
                console.log('用户获取失败', error)
            }
        },
        async getFilmInfo() {
            try {
                const response = await filmDetails.getFilmById(this.thisfilmId)
                const countresponse = await filmDetails.getFilmCount(this.thisfilmId)
                this.filmInfo = response.data
                this.filmCount = countresponse.data
            } catch (error) {
                console.error('电影信息获取失败', error)
            }
        },
        async toBtnLike(filmId) {
            //让电影的点赞量加一
            if (this.isLike === false) {
                try {
                    const response = await filmDetails.toLikeMovie(filmId)
                    //更新点赞
                    const countresponse = await filmDetails.getFilmCount(this.thisfilmId)
                    this.filmCount = countresponse.data
                } catch (error) {
                    console.log('电影点赞失败', error)
                } this.isLike = true
            } else {
                this.$notify.warning('已经点赞过一次了QAQ别点了')
            }

        },
        returnIndex() {
            this.$router.push('/move');
        },
        submit() {
            this.comment.userId = this.userInfo.userId
            this.comment.userName = this.userInfo.userName
            this.comment.filmId = this.thisfilmId
            try {
                commentManage.saveComment(this.comment).then(res => {
                    if (res.code == 20000) {
                        this.$notify.success('评论成功,有机会成为精选...')
                        this.comment.comment = ''
                        this.comments = []
                        this.showComment()
                    }
                })
            } catch(error){
                
            }

        },
        async showComment() {
            try {
                // const response = await commentManage.displayComment(this.thisfilmId)这是新接口
                const response = await commentManage.getCommentAll()
                this.Mycomment = response.data;

            } catch (error) {
                console.log('获取所有评论失败');
            }
        },
        async showGoodComment() {
            try {
                const response = await commentManage.displayComment(this.thisfilmId)
                this.MyGoodComment = response.data;

            } catch (error) {
                console.log('获取精选评论失败');
            }
        },
        toLookMovie() {
            this.isMovieBoxVisible = true;
            this.$forceUpdate();
        },
        toCloseMovie() {
            this.isMovieBoxVisible = false;
        },
        seeAllComment(){
            this.isAllCommentBoxVisible = true;
            this.isGoodCommentBoxVisible = false;
            this.isGoodCommentActive = false;
            const bottomElement = this.$refs.bottomElement;
            bottomElement.scrollIntoView({behavior:'smooth',block:'end'});
        },
        seeGoodComment(){
            this.isAllCommentBoxVisible = false;
            this.isGoodCommentBoxVisible = true;
            this.isGoodCommentActive = true;
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    background-color: #c0bdbd;
}

.BigDiv {
    height: 100%;
    overflow-y: hidden;
}

nav {
    // background-color: #383535;
    background-color: #9197B7;
    height: 50px;
}

footer {
    background-color: azure;
    height: 100px;
}

main {
    height: 100%;
}

.bigBox {
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #9197B7;
    overflow-y: scroll;
    overflow-x: hidden;
}

.LeftNav {
    width: 15%;
    height: 100%;
    background-color: #B1B4CC;

}

.RightMain {
    // 高度应该是随机的
    height: 100%;
    width: 85%;
    // background-color: rgb(34, 34, 34);
    background-color: #D1D3E0;
    color: #30415D;
    overflow: auto;
}

.MainSummaryTop {
    display: flex;
    justify-content: space-between;
    // height: 500px;
    padding: 40px 40px 50px;
    // background-color: rgba(255, 255, 255, 0.193);
}

.MainSuTopL {
    width: 80%;
    // background-color:rgb(86, 85, 86);
}

.title {
    font-size: 30px;
    font-weight: 500;
}

.tag {
    margin-top: 15px;
    height: 37px;
    width: 70px;
    text-align: center;
    line-height: 37px;
    background-color: #B2B4CA;
    border-radius: 8px;
}

.summary {
    margin-top: 35px;
    margin-bottom: 30px;
    font-size: 15px;
    line-height: 21px;
}

.any {
    margin-top: 5px;
}

.any span {
    font-weight: 600;
}

.score {
    margin-top: 15px;
    font-size: 18px;
    color: #5A8798;
}

.MainSuTopR {
    height: 300px;
    width: 220px;
    border-radius: 20px;
    background-color: white;
    overflow: hidden;
    cursor: pointer;

}

.MainSuTopR img {
    transition: all 0.6s;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.MainSuTopR img:hover {
    scale: 110%;
}

.btnBox {
    display: flex;
    justify-content: space-between;
}

.btnBoxLeft {
    position: relative;
    display: inline-block;
    margin-top: 10px;
    width: 700px;
    height: 50px;
}



.btnOrigin {
    float: left;
    height: 45px;
    width: 170px;
    // line-height: 45px;
    text-align: center;
    font-size: 19px;
    border-radius: 10px;
    background-image: linear-gradient(45deg, #d5ac5f, #fea101);
    cursor: pointer;
    transition: all 0.3s;

    ::v-deep {
        color: white;
    }
}

.btnGreen {
    float: left;
    height: 45px;
    width: 120px;
    margin-left: 15px;
    text-align: center;
    font-size: 18px;
    border-radius: 10px;
    background-image: linear-gradient(45deg, #339a71, #33cc33);
    cursor: pointer;
    transition: all 0.3s;

    ::v-deep {
        color: white;
    }
}

.btnGreen:hover {
    color: pink;
}

.btnRed:hover {
    color: black;
}

.btnOrigin:hover {
    color: black;
}

.btnRed {
    float: left;
    height: 45px;
    width: 120px;
    margin-left: 15px;
    text-align: center;
    font-size: 18px;
    border-radius: 10px;
    // background-color: #9D6163;
    background-image: linear-gradient(45deg, #C19697, #c76265);
    // background-image: linear-gradient(45deg, #ff5e62, #ff2d47);
    cursor: pointer;
    transition: all 0.3s;

    ::v-deep {
        color: white;
    }
}

.btnBoxRight {
    margin-right: 10px;
    line-height: 45px;
}

.MainSummaryButtom {
    width: 1250px;
    // height: 300px;
    padding: 50px 50px;
    // padding-bottom: 50px;
    margin: auto;
    color: black;
    background-color: white;
    border-radius: 50px 50px 0 0;
}

.MSBtitle {
    font-size: 30px;
}

.UserLogin {
    position: relative;
    margin-top: 20px;
    display: flex;
}

.UserLogin:hover .submitBox {
    background-color: #b75555;
}

.head {
    width: 50px;
    height: 50px;
}

.inputBox {
    height: 50px;
    width: 75%;
    margin-left: 30px;
    // background-color: rgb(136, 199, 35);
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.inputBoxTest {
    position: relative;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    line-height: 25px;
    background: transparent;
    border: none;
    outline: none;
}

.submitBox {
    width: 150px;
    height: 50px;
    line-height: 50px;
    margin-left: 30px;
    text-align: center;
    background-color: rgb(113, 172, 113);
    font-size: 20px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;

}

.loginAfter {
    position: absolute;
    left: 108px;
    top: 7px;
    width: 180px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #00C8C6;
    border-radius: 20px;
    color: white;
}

.discusstag {
    display: inline-block;
    margin-top: 25px;
}

.hot {
    float: left;
    height: 30px;
    width: 70px;
    margin-left:5px;
    margin-right:5px;
    background-color: #FFF2EE;
    line-height: 30px;
    text-align: center;
    color: #fe7b01;
    border: 1px solid;
    border-radius: 20px;
    font-size: 15px;
    cursor: pointer;
}

.new {
    float: left;
    height: 30px;
    width: 70px;
    margin-left:5px;
    margin-right:5px;
    background-color: #ECEBEB;
    line-height: 30px;
    text-align: center;
    color: rgba(0, 0, 0, 0.471);
    border-radius: 20px;
    font-size: 15px;
    cursor: pointer;
}

.FilmNavUl {
    padding: 30px 0;
}

.FilmNavUl :hover {
    color: #835646;
}

.FilmNavli {
    font-family: Simsun, '宋体', Arial, sans-serif;
    height: 45px;
    line-height: 45px;
    padding-left: 47px;
    color: #31405D;
    font-size: 20px;
    list-style: none;
    letter-spacing: 1px;
    font-weight: 500;
}

.liactive {
    color: #835646;
}

.FilmNavli i {
    margin-right: 10px;
}

// 导航栏
.navbar {
    height: 50px;
    display: flex;
    align-items: center;
    /* 背景颜色 */
    color: #485779;
}

.navbar-left {
    flex: 1;
    padding-left: 20px;
    cursor: pointer;
    /* 左边距 */
}

.navbar-center {
    flex: 2;
    text-align: center;
}

.navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;
    /* 右边距 */
}

.website-name {
    font-size: 24px;
    /* 网站名字字体大小 */
    font-weight: bold;
    /* 网站名字字体粗细 */
}

.el-avatar {
    margin-right: 10px;
    /* 用户头像右边距 */
}

.el-input {
    width: 300px;

    /* 搜索框宽度 */
    ::v-deep {
        background-color: rgba(0, 0, 0, 0.871) !important;
    }
}


.seeMovieBox {
    position: absolute;
    left: 0px;
    top: -418px;
    height: 623px;
    width: 1200px;
    background-color: #EFE2DB;
    // background-color: #8D9B98;
    transition: all 0.6s;
    border-radius: 10px;
    // display: none !important;
    z-index: 1;
}

.closeMovie {
    position: absolute;
    right: 0px;
    top: 10px;
    height: 50px;
    margin-top: 15px;
    margin-right: 28px;
}

.closeMovieBut {
    float: right;
    font-size: 35px;
}

.MovieBig {
    width: 85%;
    margin: auto auto;
    height: 80%;
    background-color: #d5ac5f;
}

.submitLook {
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 80px;
    // background-color: #e8e3d77a;
}
.goodComment {
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 80px;
}
.submitContent {
    position: relative;
    height: 60px;
    width: 90%;
    margin: auto;
    padding-left: 20px;
    line-height: 50px;
    margin-top: 10px;
    // background-color: #EFE2DB;
    font-size: 18px;
    border-radius: 30px;
    border: 4px solid #6A5B59;
    transition: all 0.6s;
}

.circle {
    position: absolute;
    top: 14px;
    left: -47px;
    height: 20px;
    width: 20px;
    background-color: #6A5B59;
    border-radius: 20px;
}

.ManContent {
    font-size: 20px;
    color: #45523C;
}
.submitContentTwo {
    position: relative;
    height: 60px;
    width: 90%;
    margin: auto;
    padding-left: 20px;
    line-height: 50px;
    margin-top: 10px;
    // background-color: #EFE2DB;
    font-size: 18px;
    border-radius: 30px;
    border: 4px solid #6A5B59;
    transition: all 0.6s;
}

.circleTwo {
    position: absolute;
    top: 14px;
    left: -47px;
    height: 20px;
    width: 20px;
    background-color: #6A5B59;
    border-radius: 20px;
}

.ManContentTwo {
    font-size: 20px;
    color: #45523C;
}
</style>