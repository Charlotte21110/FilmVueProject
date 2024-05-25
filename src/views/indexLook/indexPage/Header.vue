<template>
  <div>
    <div>
      <el-header>

        <div class="navBox">
          <div class="navBoxFirst">
            <div class="logo">
              <img src="/image/logo2.png" alt="hgwlogo" style="height:100%">
            </div>
          </div>
          <div class="drow">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ currentOption }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu dropdown>
                <span @click="selectOption('电影')"><el-dropdown-item>电影</el-dropdown-item></span>
                <span @click="selectOption('影评')"><el-dropdown-item>影评</el-dropdown-item></span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="navBoxSecond">
            <div class="center search_bar navSearch">
              <div class="navSearch">
                <div class="search_content">
                  <el-input class="this_search_content" v-model="inputSearch" clearable placeholder="请输入影视名字查询，比如：怦然心动，点击电影标题查看详情...">
                  </el-input>
                </div>
                <div class="search_button">
                  <span @click="toSearch()">
                    <el-button class="this_search_button" type="primary" icon="el-icon-search">搜索</el-button></span>
                </div>
              </div>
            </div>
          </div>
          <div class="navBoxThird">
            <ul class="front-right">

              <li class="front_right_el">
                <div>

                  <a href="#">
                    <el-button type="info" plain @click="returnTo()">个人空间/登陆</el-button>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="searchBigBox" v-show="isToShowSearchBigBox">
            <div class="seeMovieBox" v-show="isSeeMovieBox" 
              v-if="!isSeeMore && searchBoxFilmContent && searchBoxFilmContent[0]">
              <div class="PictureBox">
                <img class="PicImg" :src="searchBoxFilmContent[0].imgUrl" >
              </div>
              <div class="SearchTextBox" >
                <div class="BigTitle" @click="toDetails(searchBoxFilmContent[0].filmId)">{{ searchBoxFilmContent[0].filmName }}</div>
                <div class="Tag">{{ searchBoxFilmContent[0].filmCategory }}</div>
                <div class="Area">{{ searchBoxFilmContent[0].filmArea }}</div>
                <div class="summary">
                  电影介绍：{{ searchBoxFilmContent[0].filmSummary }}</div>
              </div>

              <div class="lookMore" v-show="searchBoxFilmContent && searchBoxFilmContent.length > 1" @click="onSeeMore">
                查看更多
              </div>

            </div>
            <div class="seeMovieBox" v-show="isSeeMovieBox"
              v-if="isSeeMore && searchBoxFilmContent && searchBoxFilmContent[0]"
              v-for="(item, index) in searchBoxFilmContent" :key="index">
              <div class="PictureBox">
                <img class="PicImg" :src="item.imgUrl">
              </div>
              <div v-if="searchBoxFilmContent" class="SearchTextBox">
                <div class="BigTitle" @click="toDetails(searchBoxFilmContent[0].filmId)">{{ item.filmName }}</div>
                <div class="Tag">{{ item.filmCategory }}</div>
                <div class="Area">{{ item.filmArea }}</div>
                <div class="summary">
                  电影介绍：{{ item.filmSummary }}</div>
              </div>



            </div>
            <div v-show="searchBoxFilmContent && searchBoxFilmContent <= 0" class="notFind">

              没有该电影哦，期待您的加入与补充
              <div style="margin-top: 60px;"><img src="@/assets/notfound.gif"></div>

            </div>

            <!-- 下面是影评的 -->
            <div class="seeMovicArticle" v-show="isSeeMovieArticleBox"
              v-if="!isSeeMoreTwo && searchBoxArticleContent && searchBoxArticleContent[0]">
              <div class="ArticleBigTitle">{{ searchBoxArticleContent[0].title }}</div>
              <div class="PassageName">对《{{ searchBoxArticleContent[0].filmName }}》的评析</div>
              <div class="PassDescription">{{ searchBoxArticleContent[0].description }}</div>
              <div class="MoreArticle">
                <div class="MoreText" v-html="searchBoxArticleContent[0].article">

                </div>
              </div>

              <div class="lookMore" v-show="searchBoxArticleContent && searchBoxArticleContent.length > 1"
                @click="onSeeMoreTwo">查看更多</div>
            </div>
            <!-- 查看更多的内容 -->
            <div class="seeMovicArticle" v-show="isSeeMovieArticleBox"
              v-if="isSeeMoreTwo && searchBoxArticleContent && searchBoxArticleContent[0]"
              v-for="(item, index) in searchBoxArticleContent" :key="index">
              <div class="ArticleBigTitle">{{ item.title }}</div>
              <div class="PassageName">对《{{ item.filmName }}》的评析</div>
              <div class="PassDescription">{{ item.description }}</div>
              <div class="MoreArticle">
                <div class="MoreText" v-html="item.article">

                </div>
              </div>
            </div>
            <div v-show="searchBoxArticleContent && searchBoxArticleContent <= 0" class="notFind">

              没有该影评哦，期待您的加入与补充
              <div style="margin-top: 60px;"><img src="@/assets/notfound.gif"></div>

            </div>
            <div class="clostBig" @click="toCloseSearchBox()">
              <el-button icon="el-icon-circle-close"></el-button>
            </div>

          </div>
        </div>
      </el-header>
    </div>

  </div>
</template>
  
<script>
import getFilmHavePassRiview from '@/api/filmManage'
import getAllArticleHavePassRiview from '@/api/articleAuditManage'
export default {
  data() {
    return {
      input: '',
      circle1: "https://imgse.com/i/piPwVbQ",
      currentOption: '电影',
      inputSearch: '',
      searchContent: '',
      isToShowSearchBigBox: false,
      isSeeMovieBox: false,
      isSeeMovieArticleBox: false,
      isSeeMore: false,
      isSeeMoreTwo: false,
      searchBoxFilmContent: {},
      searchBoxArticleContent: {}
    }
  },
  created() {
  },
  methods: {
    returnTo() {
      this.$router.push('/dashboard')
    },
    selectOption(option) {
      this.currentOption = option;
    },
    toSearch() {
      this.searchContent = this.inputSearch;
      this.inputSearch = '';
      this.isToShowSearchBigBox = true;
      this.decideWhat();

    },
    decideWhat() {
      if (this.currentOption === '电影') {
        this.isSeeMovieBox = true;
        this.isSeeMovieArticleBox = false;
        //进入获取电影的接口
        this.toGetSearchFilm()
      }
      if (this.currentOption == '影评') {
        this.isSeeMovieBox = false;
        this.isSeeMovieArticleBox = true;

        this.toGetSearchArticle()
      }
    },
    async toGetSearchFilm() {
      this.isSeeMore = false
      try {
        if (this.searchContent !== null) {

          const response = await getFilmHavePassRiview.getFilmMessage();
          this.searchBoxFilmContent = response.data.filter(item => item.filmName.includes(this.searchContent))
        }
      }
      catch (error) {
        console.log('搜索栏获取所有电影失败')
      }

    },
    async toGetSearchArticle() {
      this.isSeeMoreTwo = false
      try {
        if (this.searchContent !== null) {
          const response = await getAllArticleHavePassRiview.getAllArticleHavePass();
          this.searchBoxArticleContent = response.data.filter(item => item.filmName.includes(this.searchContent))
        }
      }
      catch (error) {
        console.log('搜索栏获取所有影评失败')
      }
    },
    onSeeMore() {
      this.isSeeMore = true
    },
    onSeeMoreTwo() {
      this.isSeeMoreTwo = true
    },
    toCloseSearchBox() {
      this.isToShowSearchBigBox = false;
    },
    toDetails(filmId){
      this.$router.push({ name: 'filmDetails', params: { filmId: filmId } })
    }
  }
};
</script>
  
<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  height: 10px;
  border-radius: 10px;
  background-color: #c0bdbd;
}

.navBox {
  position: relative;
}

* {
  margin: 0% 0%;
  padding: 0% 0%;
}

.el-header h1 {
  margin: 0% !important;
  width: 100%;
  text-align: center;
  color: #e9eef3;

}

.el-header {

  color: #333;
  text-align: center;
  height: 100px !important;
  background-image: url(/image/banner4.jpg);
  background-size: 100%;
  background-position: center;
}

.navBox {
  display: flex;
  justify-content: space-around;
  width: 90%;
  height: 50px;
  margin: auto;
  padding-top: 25px;
}

.el-col {
  border-radius: 4px;
}


.logo {
  height: 50px;
}

.logo img {
  height: 100%;
}

.search_content {
  width: 600px;

}

.search_button {
  width: 100px;
  float: left;
  margin-left: 5px;
}

.front-right {
  list-style: none;
  align-self: center;

}

.front_right_el {
  /* display: inline !important; */
  list-style: none;
  float: left;
  align-items: center;
  margin-left: 10px;
}

.front_right_el span {
  font-size: 13px;

}

.navSearch {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
}

.this_search_button {
  background-color: black;
  border: 1px solid #e9eef3;
}

/** 
.this_search_button:hover {
  background-color: rgb(186, 110, 161)!important;
  border: 1px solid #e9eef3;

}
.this_search_button .el-button {
  background-color: black;
  border: 1px solid #e9eef3;
}

.this_search_button .el-button:hover {
  background-color: rgb(186, 110, 161)!important;
  border: 1px solid #e9eef3;
}

.this_search_content {
  background-color: antiquewhite;
}
*/
.drow {
  width: 97px;
  height: 36px;
  padding-top: 8px;
  padding-bottom: 10px;
  text-align: center;
  background-color: white;
  cursor: pointer;
  margin-top: 5px;
}

.searchBigBox {
  position: absolute;
  top: 130px;
  height: 500px;
  width: 814px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.868);
  z-index: 10;
  border-radius: 10px;
  overflow-y: auto;
}

.seeMovieBox {
  display: flex;
  justify-content: space-between;
  width: 700px;
  height: 350px;
  margin: 60px auto;
  /* background-color: aqua; */
}


.PictureBox {
  height: 324px;
  width: 240px;
  background-color: pink;
  box-shadow: 0 0 5px rgb(121, 120, 120);
}

.PicImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.SearchTextBox {
  width: 430px;

}

.BigTitle {
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}

.summary {
  margin-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  /* 显示的行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 34px;
}

.lookMore {
  position: absolute;
  bottom: 53px;
  height: 50px;
  width: 687px;
  text-align: center;
  margin: auto;
  /* margin-top: 50px; */
  border-radius: 6px;
  line-height: 50px;
  background-color: #C3C8D4;
  color: #656565;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

.lookMore:hover {
  background-color: #E6C9CE
}

.clostBig {
  position: absolute;
  top: 12px;
  right: 4px;
}

.clostBig .el-button {
  font-size: 35px;
  border: transparent;
  background-color: transparent;
}

.seeMovicArticle {
  padding: 20px;
  width: 700px;
  margin: 60px auto;
  /* background-color: #C2C8D8; */
}

.ArticleBigTitle {
  font-size: 28px;
}

.PassageName {
  margin-top: 20px;
  font-style: italic;
}

.PassDescription {
  margin-top: 20px;
  font-size: 20px;
}

.MoreArticle {
  margin-top: 15px;
}

.Tag {
  margin-top: 37px;
}

.Area {
  margin-top: 22px;
}

.notFind {
  margin-top: 50px;
  font-size: 25px;
  color: #806F82;
}
</style>