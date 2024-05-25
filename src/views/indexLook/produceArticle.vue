<template>
    <div class="BigBox">
        <div class="Top">
            <div class="TopBox">
                <div class="TopBoxTitle" @click="toMove()">
                    影评创作
                </div>
                <div class="TopBoxTitleTwo">（想想看什么网）收集中外古今观影心得</div>
                <div class="TopBoxTitleThree">
                    <!-- <ul>
                        <li>首页</li>
                        <li>分类</li>
                        <li>世界</li>
                        <li>杂谈</li>
                        <li>夜谈</li>
                        <li>关于</li>
                        <li>公告</li>
                        <li>赞助</li>
                        <li>官方周边</li>
                        很好看但删掉很可惜的标题，哎
                    </ul> -->
                    <div class="line"></div>
                </div>
                <div class="TopBoxTitleFour">
                    2200+个影评写手聚集在此
                </div>
            </div>
        </div>
        <div class="TopTriangle"></div>
        <div class="main">
            <el-card>
                <el-form :model="articleForm" :label-position="labelPosition" ref="filmFormRef">

                    <el-form-item label="电影名" :label-width="formLabelWidth" prop="filmName">
                        <el-input v-model="articleForm.filmName" autocomplete="off" placeholder="请输入电影名称"></el-input>
                    </el-form-item>

                    <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="articleForm.title" autocomplete="off" placeholder="请输入标题"></el-input>
                    </el-form-item>

                    <el-form-item label="简介" :label-width="formLabelWidth" prop="description">
                        <el-input v-model="articleForm.description" placeholder="请输入简介"></el-input>
                    </el-form-item>

                    <el-form-item label="内容" :label-width="formLabelWidth" prop="article">
                        <div id="editor"></div>
                    </el-form-item>

                </el-form>
                <div>
                    <el-button @click="saveArticle()">提 交</el-button>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
import articleApi from '@/api/articleManage'
import E from 'wangeditor'
import hljs from 'highlight.js'
export default {
    data() {
        return {
            editor: null,
            article: '',
            articleForm: {},
            labelPosition: 'top'
        }
    },
    created() {
        this.loadEditor()
    },
    methods: {
        saveArticle() {
            // 获取编辑器内容
            let content = this.editor.txt.html();
            this.articleForm.article = content;
            articleApi.saveArticle(this.articleForm).then(response => {
                console.log(this.articleForm, 'articleForm');
                this.$message({
                    message: response.message,
                    type: 'success'
                });
                this.toMove();
            });
        },
        loadEditor() {
            this.$nextTick(() => {
                this.editor = new E('#editor');
                // 代码高亮
                this.editor.highlight = hljs;
                this.editor.config.uploadImgServer = process.env.VUE_APP_BASE_API + '/file/editorUpload';
                this.editor.config.uploadFileName = 'file';
                this.editor.create();
            });
        },
        // 跳转到写影评的地方 暂时这么写
        toMove() {
            this.$router.push("/move")
        },
    }
}
</script>

<style lang="scss" scoped>
.BigBox::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.BigBox::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    background-color: #c0bdbd;
}

.el-card .el-input {
    width: 300px;
}

.el-card {
    margin: auto;
    width: 50%;
    height: 50%;
    position: relative;
    // background-color: #F5DAE3;
}

.Top {
    height: 250px;
    background-color: #BDAAAC;
    color: white;
}

.TopTriangle {
    width: 0;
    height: 0;
    border-left: 49vw solid transparent;
    border-right: 49.5vw solid transparent;
    border-top: 150px solid #BDAAAC;
}
.TopBox {
    // height: 100px;
    width: 800px;
    text-align: center;
    padding-top: 80px;
    // background-color: rgb(58, 58, 51);
    margin: auto;

}
.TopBoxTitle {
    font-size: 40px;
    font-weight: 800;
    cursor: pointer;
}
.TopBoxTitleTwo {
    font-style: italic;
    // color:rgb(146, 146, 146);
    color: white;
    margin-top: 20px;
}
.TopBoxTitleThree {
    display: inline-block;
    margin-top: 15px;
    clear: both;
}
.TopBoxTitleThree ul {
    display: inline-block;
}
.TopBoxTitleThree ul li {
    float: left;
    list-style: none;
    margin-right:30px; 
    font-size: 15px;
    font-weight: 600;
}
.TopBoxTitleFour {
    font-size: 23px;
    margin-top: 20px;
    font-weight: 600;
}
.main {
    margin-top: 30px;

}
.line {
    width: 414px;
    border: 2px solid white;
}
</style>