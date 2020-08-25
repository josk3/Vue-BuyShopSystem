/**
 * 配置值
 */
module.exports = {
    title: 'portal.title', //i18n

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',

    anonAuthPages: ['/login', '/logout', '/404', '/401', '/500'], //不用登录状态也能访问
    logoutPath: '/logout',
    loginPath: '/login',
    homePath: '/',
    apiCode: {
        needLogin: 7011,
        reloadUserData: 7010,
    },

}
