/**
 * 配置值
 */


function getOffDomain() {
    return process.env.VUE_APP_WINTOPAY_DOMAIN;
}

module.exports = {
    isProEnv: (process.env.VUE_APP_ENV !== undefined && process.env.VUE_APP_ENV === 'pro'),
    title: 'portal.title', //i18n

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',

    apiBaseUrl: process.env.VUE_APP_BASE_API,
    imgBaseUrl: process.env.VUE_APP_IMG_URL,
    //
    aboutUsUrl: getOffDomain(),
    contactUsUrl: getOffDomain() + '/contact_us',
    aliImageValidAppKey: 'FFFF0N00000000009051',

    anonAuthPages: ['/login', '/logout', '/404', '/401', '/500',
        '/register', '/forget_pwd', '/reset_pwd', '/active_email', '/terms','/valid_code'], //不用登录状态也能访问
    logoutPath: '/logout',
    loginPath: '/login',
    profilePath: '/profile',
    faqPath: '/faq',
    homePath: '/home',
    financePath: '/finance/search',
    msgCenterPath: '/message/center',
    notifyListPath: '/message/center/notify',
    forgetPwdPath: '/forget_pwd',
    registerPath: '/register',
    ticketPath: '/support/ticket',
    termsPath: '/terms',
    chargebackPath: '/decline/manage',
    disputePath: '/dispute/manage',
    orderDetailPath: '/order/detail/',
    disputeDetailPath: '/dispute/detail/',
    apiCode: {
        needLogin: 7011,
        reloadUserData: 7010,//用户状态或有新消息或数据有更新时
        needValidCode: 7002,//当前操作需要验证码, 例如注册登录多次尝试失败时
        needValidStatus: 7003, //用户还没验证邮箱或手机号
        passwordExpired: 71021, //用户密码过期提示修改密码
        existsParam: 43000, //某个元素已经存在,如注册时手机号，邮箱已经注册过了
        reqIsBad: 42002,//请求非法
    },
    perm: {
        home_trade_report: 'home_trade_report',
        can_view_balance: 'can_view_balance',
        delivery_download: 'delivery_download',
    },
    template: {
        //企业授权书模板
        companyAuthorizationPath: 'https://wintopay-pub.oss-cn-shanghai.aliyuncs.com/static/docs/merchant/%E7%BB%93%E7%AE%97%E8%B4%A6%E6%88%B7%E5%A7%94%E6%89%98%E6%8E%88%E6%9D%83%E4%B9%A6-%E4%B8%AA%E4%BA%BAv2.pdf',
    }
}
