import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //自己添加

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/filmDetails/:filmId",
    name: "filmDetails",
    component: () => import("@/views/indexLook/filmDetails.vue"),
    // hidden:true
  },
  {
    path: "/write/article",
    name: "editArticle",
    component: () => import("@/views/indexLook/produceArticle.vue"),
  },
  {
    path: "/articleDetail/:articleId",
    name: "articleDetail",
    component: () => import("@/views/article/articleDetail.vue"),
    // hidden:true
  },
  {
    path: "/",
    component: Layout,
    // redirect: '/dashboard',
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "个人空间", icon: "el-icon-set-up" },
      },
    ],
  },
  {
    path: "/move",
    component: () => import("@/views/indexLook/move/index"),
    hidden: true,
  },


  //狗哥新加

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
];
export const asyncRoutes = [
  {
    path: "/sys",
    component: Layout,
    redirect: "/sys/user",
    name: "sysManage",
    meta: { title: "系统管理", roles: ["admin","adminTest","dataAdmin"], icon: "el-icon-tableware" },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/sys/user"),
        meta: {
          title: "用户管理",
          roles: ["adminTest"],
          icon: "el-icon-cold-drink",
        }, //只有管理员权限才可以用户管理
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/sys/rote"),
        meta: {
          title: "角色管理",
          roles: ["adminTest"],
          icon: "el-icon-coffee-cup",
        },
      },
    ],
  },
  {
    path: "/filmer",
    component: Layout,
    redirect: "/film/filmManage",
    name: "filmManage",
    meta: {
      title: "影视",
      roles: ["filmer", "dataAdmin","upLoader"],
      icon: "el-icon-video-camera",
    },
    children: [
      {
        path: "uploadFilm",
        name: "uploadFilm",
        component: () => import("@/views/film/uploadFilm.vue"),
        meta: {title: "上传电影", roles:["filmer"], icon: "el-icon-data-analysis"}
      },
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/film/manage"),
        meta: { title: "影视管理", roles: ["dataAdmin"], icon: "el-icon-monitor" },
      },
      {
        path: "audit",
        name: "audit",
        component: () => import("@/views/film/audit"),
        meta: {
          title: "影视审核",
          roles: ["dataAdmin"],
          icon: "el-icon-s-check",
        },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/film/upload"),
        meta: {
          title: "影视精选上架",
          roles: ["upLoader"],
          icon: "el-icon-upload2",
        },
      },
    ],
  },
  // 新增点赞管理 评论显示 评论审核 影评管理 影评审核

  {
    path: "/comment",
    component: Layout,
    redirect: "/comment/manage",
    name: "commentManage",
    meta: {
      title: "评论",
      roles: ["dataAdmin","upLoader"],
      icon: "el-icon-s-comment",
    },
    children: [
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/comment/manage"),
        meta: { title: "评论管理",roles:["dataAdmin"], icon: "el-icon-monitor" },
      },
      {
        path: "audit",
        name: "audit",
        component: () => import("@/views/comment/audit"),
        meta: { title: "评论审核",roles:["dataAdmin"], icon: "el-icon-s-check" },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/comment/upload"),
        meta: {
          title: "评论精选上架",
          roles: ["upLoader"],
          icon: "el-icon-upload2",
        },
      }
    ],
  },
  {
    path: "/article",
    component: Layout,
    redirect: "/article/manage",
    name: "articleManage",
    meta: { title: "影评", roles: [ "dataAdmin","upLoader"], icon: "form" },
    children: [
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/article/manage"),
        meta: { title: "影评管理",roles:["dataAdmin"], icon: "el-icon-monitor" },
      },
      {
        path: "audit",
        name: "audit",
        component: () => import("@/views/article/audit"),
        meta: { title: "影评审核",roles:["dataAdmin"], icon: "el-icon-s-check" },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/article/upload"),
        meta: {
          title: "影评精选上架",
          roles: ["upLoader"],
          icon: "el-icon-upload2",
        },
      }
    ],
  },
  {
    path: "/like",
    component: Layout,
    redirect: "/like",
    name: "likeManage",
    meta: { title: "点赞", roles: [ "dataAdmin"] },
    children: [
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/like/manage"),
        meta: { title: "点赞管理", icon: "el-icon-thumb" },
      },
    ],
  },
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
