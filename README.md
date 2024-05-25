# 项目介绍

这是我带领我组三个人，一个产品ui，一个前端，一个后端，一个月一起完成的大三上课程作业，主要是C端与B端结合的一个影视系统

前端技术：

Vue.js+Vuex+Axios+vue-Admin-Template+ElementUI+node.js

后端技术：

Springboot+redis+mybatis+mybatisplus+sql+Maven

1．选题名称

影视推荐分享在线观影平台与后台设计

2．选题描述

基于对影视娱乐的热爱，海量的影视作品难以找到自己喜欢看的，且发现市场上许多电影部分评论是水军以假乱真，导致一些好电影埋没，差电影出圈，评论区风气脏乱差，电影无法再感兴趣的同时在线观看。没用一个友好真实的推荐平台，我组人员一起创造出一个符合我们设想的集影视推荐观影评论一体的系统。

随着数字媒体和互联网的迅速发展，人们对优质影音内容的需求日益增加，传统的电影、音乐和视频消费方式逐渐被数字平台所取代，用户可以在庞大且复杂的影音世界里选择心仪的内容。选择增加了，但问题也同步发展了起来。

1、信息过载：越来越多的影音产品涌入互联网，信息大爆炸时代大量内容的涌现使得用户难以确定哪些值得观看或听取。

2、个性化需求：用户对于影音产品都有各自不同的兴趣和偏好，或者在现有的兴趣点之上探索发现新的、未知的领域内容。

3、时间浪费：用户可能花费大量时间浏览大量内容，但最终可能仍然找不到感兴趣的媒体。

出于这些挑战和机遇的考虑，我们决定开发一个影音推荐系统，以满足用户的个性化需求，呈现优质的内容，帮助他们发现高质量的、与期望相符的影音内容，节省时间和精力。

# **项目部署**

## 前端模块导入问题

所有前端模块均已打包进项目里，若不能正常启动则需要安装依赖

配置安装镜像

npm config set registry http://registry.npm.taobao.org/

安装依赖

npm install

npm run dev

## 后端环境

maven3.6.2

redis启动redis-server，端口号默认

##  数据库环境

登录账号**root** 密码**123456**

数据库名 film

依次创建表

**具体流程**

后端环境：

JDK: 14

Maven: 3.6.2

mysql: 8.0.30

启动：idea打开springboot\filmr，执行maven install,再运行FilmrApplication

## 前端环境：

node.js: 16.14.2

启动:vsc打开vueAdminTheNewest\vue-admin-template-4.4.0， 配置安装镜像 npm config set

registry http://registry.npm.taobao.org/ 执行 npm install ，依赖安装完成后执行npm run dev

缓存数据库：

本项目部分业务需要使用redis，在项目启动后需要启动redis-service.exe

数据库环境：

\* 登录账号**root** 密码**123456*** 数据库名 film

\* 依次创建表

后端启动idea打开项目后，推荐使用Maven版本3.6.2加载所有依赖，根据sql代码创建完film数据库和所

有数据表之后，启动redis-service挂着，启动FilmrApplication，准备完成。

前端推荐使用node版本16.14.2，将前端代码拖进工作区后，根目录终端输入npm install安装

node_modules，之后输入npm run dev启动服务，返回浏览器启动http://localhost:8888/即可看到主

页,启动完成。

一切操作正常之下不会出现空白页！

浏览器输入http://localhost:9999/doc.html，便可看见我们已用knife4j配置好的接口文档
