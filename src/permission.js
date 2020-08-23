import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/service/auth/token' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import configs from '@/configs'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const anonAuthPages = configs.anonAuthPages // whitelist

/**
 * 处理用户登录, 侧边menus(router)
 */
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  //logout
  if (to.path === configs.logoutPath) {
    await store.dispatch('user/logout')
    next(configs.loginPath)
    NProgress.done()
    if (from.path !== configs.loginPath) {
      Message.success('退出登录')
    }
  }
  if (hasToken) {
    if (to.path === configs.loginPath) {
      //next({ path: configs.homePath })
      next()
      NProgress.done()
    } else {
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      if (hasMenus) {
        next()
      } else {
        try {
          // get user info
          const { menus } = await store.dispatch('user/loadUserInfo')
          if (menus === undefined || menus === '' || menus === null) {
            new Error('401')
          }
          //user menus
          router.addRoutes(menus)
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
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
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
