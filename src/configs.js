module.exports = {
    title: 'Merchant Portal',

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',

    logoutPath: '/logout',
    loginPath: '/login',
    homePath: '/',
    apiCode: {
        needLogin: 7011,
    }

}