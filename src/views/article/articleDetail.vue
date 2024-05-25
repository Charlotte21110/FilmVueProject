<template>
     <div class="Main">
          <div class="MainBox">
               <div class="MainTop">

                    <div class="Title" @click="toMove()">{{ article.title }}
                    </div>
                    <div class="Time"><span>{{ article.time }}</span></div>
               </div>
               <div class="Text">
                    <div class="TextSmallBox" v-html="article.article"></div>
               </div>
          </div>
     </div>
</template>

<script>
import api from '@/api/articleManage'
export default {
     name: "articleDetail",


     data() {
          return {
               article: {},
          };
     },
     methods: {
          async getArticleInfo(articleId) {
               try {
                    const response = await api.getArticleById(articleId)
                    this.article = response.data
               } catch (error) {
                    console.error('影评信息获取失败', error)
               }
          },
          toMove() {

               this.$router.push('/move');
          }   
     },
     created() {
          let articleId = this.$route.params.articleId;
          if (!articleId) {
               return;
          }
          this.getArticleInfo(articleId)

     }

};
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
     background-color: #695C57;
}

.Title {
     // margin: 10px 0 20px 0;
     font-size: 30px;
     text-align: center;
     font-weight: bold;
     cursor: pointer;
}

.Time {
     text-align: center;
     margin: 10px;
     font-size: 13px;
     color: #666;
}

.Time span {
     margin-left: 20px;
}

.Text {
     box-shadow: 0 0 15px rgba(0, 0, 0, 0.375);
     background-color: rgba(255, 255, 255, 0.797);
     padding: 10px;
     /* 添加以下样式以在内容溢出时显示垂直滚动条 */
     overflow-y: scroll;
     /* 或可以使用 "auto" 以在需要时显示滚动条 */
     max-height: 600px;
}

.TextSmallBox {
     line-height: 30px;
     font-size: 20px;
}

.MainBox {

     width: 60%;
     margin: auto;
     // background-color: #E6E4D7;
}

.Main {
     padding-top: 20px;
     background-color: #DBEAE0;
     height: 100%;
     width: 100%;
     background-image: url(/image/articleBag.png);
     background-repeat: no-repeat;
     background-size: 100% 100%;
     overflow: hidden;
     
}

.MainTop {
     // background-color: #666
}
</style>
