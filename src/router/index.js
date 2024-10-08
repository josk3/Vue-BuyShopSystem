import Vue from 'vue'
import Router from 'vue-router'
import Blank from "@/layout/blank";
import configs from "@/configs";

Vue.use(Router)

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    {
        path: '',
        component: Blank,
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/login/index'),
                hidden: true
            },
            {
                path: '/logout',
                name: 'logout',
                component: () => import('@/views/login/index'),
                hidden: true
            },
            {
                path: '/forget_pwd',
                name: 'forget_pwd',
                component: () => import('@/views/login/forgetPwd'),
                hidden: true
            },
            {
                path: '/reset_pwd',
                name: 'reset_pwd',
                component: () => import('@/views/login/resetPwd'),
                hidden: true
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('@/views/login/register'),
                hidden: true
            },
            {
                path: '/active_email',
                name: 'active_email',
                component: () => import('@/views/login/activeEmail'),
                hidden: true
            },
            {
                path: '/terms',
                name: 'terms',
                component: () => import('@/views/public/terms'),
                hidden: true
            },
            {
                path: '/404',
                name: '404',
                component: () => import('@/views/error-page/404'),
                hidden: true
            },
            {
                path: '/401',
                name: '401',
                component: () => import('@/views/error-page/401'),
                hidden: true
            },
            {
                path: '/',
                redirect: configs.homePath,
                hidden: true
            }
        ]
    },
    {
        path: '/valid_code',
        name: 'valid_code',
        // component: () => import('@/views/login/AliValidCode'),
        component: () => import('@/views/login/AliValidCode'),
        hidden: true
    }
    // {
    //     path: '/',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import('@/views/portal/home/index'),
    //             name: 'homePage',
    //             meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
    //         },
    //         {
    //             path: 'home',
    //             component: () => import('@/views/portal/home/index'),
    //             name: 'Dashboard',
    //             meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
    //         }
    //     ]
    // },

]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
