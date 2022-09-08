import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/service/auth/token' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import configs from '@/configs'
import {convertRouters, renderRedirectTo} from "@/router/routerUtils";
import i18n from "@/service/i18n";
import {isEmpty} from "@/utils/validate";
import user from "@/store/modules/user";

NProgress.configure({showSpinner: false}) // NProgress Configuration

const anonAuthPages = configs.anonAuthPages // whitelist

/**
 * 处理用户登录, 侧边menus(router)
 */
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title || to.name)

    // determine whether the user has logged in
    const hasToken = getToken()

    //logout
    if (to.path === configs.logoutPath) {
        await store.dispatch('user/logout')
        next(configs.loginPath)
        NProgress.done()
        if (!isEmpty(hasToken) && from.path !== configs.loginPath) {
            Message.success(i18n.t('comm.logout_ok').toString())
        }
    } else {
        if (hasToken) {
            if (anonAuthPages.indexOf(to.path) !== -1) {
                //next({ path: configs.homePath })
                next()
                NProgress.done()
            } else {

                const hasMenus = store.getters.menus && store.getters.menus.length > 0
                if (hasMenus) {
                    if (!isEmpty(user.state) && !isEmpty(user.state.user) && (user.state.user.online === false || isEmpty(user.state.user.email))) {
                        //vue-router 3.1.0+ push/replace cause NavigationDuplicated error 
                        //https://github.com/ElemeFE/element/issues/17044
                        if (to.path === configs.homePath || to.path === configs.profilePath) {
                            next()
                        } else {
                            next({path: configs.homePath, query: {ol: new Date().getMilliseconds()}, hash: to.name}) //只有开通才可以使用
                        }
                        NProgress.done()
                    } else {
                        next()
                    }
                } else {
                    try {
                        // get user info
                        const {menus} = await store.dispatch('user/loadUserInfo')
                        if (menus === undefined || menus === '' || menus === null) {
                            new Error('401')
                        }
                        //后端数据
                        router.addRoutes(convertRouters(menus))
                        // set the replace: true, so the navigation will not leave a history record
                        next({...to, replace: true})
                    } catch (error) {
                        Message.error(error || 'Has Error')
                        //await store.dispatch('user/resetToken')
                        //let redirectTo = renderRedirectTo(to.path)
                        //next(`/login${redirectTo}`)
                        NProgress.done()
                    }
                }

            }
        } else {
            /* has no token*/
            if (anonAuthPages.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                let redirectTo = renderRedirectTo(to.path)
                next(`/login${redirectTo}`)
                NProgress.done()
            }
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
