const delay = require('mocker-api/lib/delay');

function demoUserInfo() {
    return {
        status: 1,
        data: {
            merchant: {
                mer_no: '4008'
            },
            user: {
                uid: 1,
                username: 'kenny',
                name: '张三',
                email: 'xxx@test.com',
                second_login: '2020-01-01 00:00:00',
                status: 1,
                identifier_status: 0,
                mer_no: '4008',
                notice_count: 11
            },
            token: "00e3c2a5d87a9e34ef2e879309cb1a31bf3dc56eb0f77fe4ba",
            menus: [
                {
                    "name": "home",
                    "path": "/",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "active_account",
                    "path": "/merchant/active_account",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "trade_manage",
                    "path": "/trade/manage",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "refund_select",
                    "path": "/refund/search",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "payout_select",
                    "path": "/payout/search",
                    "meta": null,
                    "children": [
                        {
                            "name": "payout_apply",
                            "path": "/payout/apply",
                            "meta": null
                        },
                        {
                            "name": "payout_history",
                            "path": "/payout/history",
                            "meta": null
                        }
                    ],
                    "have_show_child": true
                },
                {
                    "name": "finance_select",
                    "path": "/finance/select",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "fast_pay",
                    "path": "/fast_pay/index",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "delivery_manage",
                    "path": "/delivery/manage",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "risk_manage",
                    "path": "/risk/manage",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "dispute_manage",
                    "path": "/dispute/manage",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "account_manage",
                    "path": "/account/manage",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "support_ticket",
                    "path": "/support/ticket",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "message_center",
                    "path": "/message/center",
                    "meta": null,
                    "children": null,
                    "have_show_child": false
                }
            ]
        }
    };
}

const proxy = {
    // Priority processing.
    // apiMocker(app, path, option)
    // This is the option parameter setting for apiMocker
    _proxy: {
        proxy: {
            // Turn a path string such as `/user/:name` into a regular expression.
            // https://www.npmjs.com/package/path-to-regexp
            //'/api/v1/(.*)': 'https://portal.wintopay.com/'
            // '/api/v1/(.*)': 'https://165.wtpdev.com:38013',
            // '/api/v1/(.*)': 'http://192.168.3.182:8013',
            // '/api/v1/(.*)': 'http://127.0.0.1/',
            // '/api/v1/(.*)': 'http://localhost:8013/',
        },
        changeHost: true,
        header: {
            'Access-Control-Allow-Headers': '*',
            // 'Access-Control-Expose-Headers': 'Wp-Token',
            // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        },
        // httpProxy: {
        //     options: {
        //         ignorePath: true,
        //     },
        //     listeners: {
        //         proxyReq: function (proxyReq) { //, req, res, options
        //             proxyReq.setHeader('X-M-Proxy', 'mocker');
        //         },
        //     },
        // },
    },
    // =====================
    // The default GET request.
    // https://github.com/jaywcjlove/mocker-api/pull/63
    'GET /api/v1/logout': {
        status: 1,
        message: '成功退出',
        code: 0,
        i18n: null,
        error: null,
        data: null,
        request_id: 'req_uiClf1xx'
    },
    'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => {
        const {owner, repo, ref} = req.params;
        // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
        // owner => admin
        // repo => webpack-mock-api
        // ref => master
        // req.params[0] => add/ddd.md
        return res.json({
            id: 1,
            owner, repo, ref,
            path: req.params[0]
        });
    },
    'POST /api/v1/login': (req, res) => {
        const {password, username, mer_no} = req.body;
        if (password === 'Test123456' && username === 'admin') {
            console.log(mer_no)
            return res.json(demoUserInfo());
        } else {
            return res.status(200).json({
                status: 0,
                code: 4011,
                message: '登录失败 ' + new Date().getMilliseconds(),
                i18n: 'login.username.fail'
            });
        }
    },
    'POST /api/v1/register': (req, res) => {
        return res.json({
            status: 1,
            message: '注册成功',
            data: {uid: 'wef823fo2', mer_no: 'M892834'},
            i18n: 'success',
        });
    },
    'POST /api/v1/register/resend_email': (req, res) => {
        return res.json({
            status: 1,
            message: '发送成功',
            i18n: 'success',
        });
    },
    'POST /api/v1/user/info': (req, res) => {
        return res.json(demoUserInfo());
    },
    'GET /api/v1/profile': (req, res) => {
        let u = demoUserInfo();
        u.code = 7010;
        u.data.user.email = 'N' + u.data.user.email
        return res.json(u);
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({status: 'ok', message: '删除成功！'});
    },
    'POST /api/v1/password/forget/resend_email': (req, res) => {
        const {mer_no} = req.body;
        return res.json({
            status: mer_no === '4008' ? 1 : 0,
            message: mer_no === '4008' ? "ok" : "操作过于频繁",
            data: {}
        });
    },
    'POST /api/v1/password/forget': (req, res) => {
        const {mer_no} = req.body;
        return res.json({
            status: mer_no === '4008' ? 1 : 0,
            message: mer_no === '4008' ? "ok" : "商户号找不到",
            data: {}
        });
    },
    'POST /api/v1/password/reset': (req, res) => {
        const {code} = req.body;
        return res.json({
            status: code === '8888' ? 1 : 0,
            message: code === '8888' ? "ok" : "邮件链接已失效,请重新操作找加密",
            data: {}
        });
    },
    'POST /api/v1/register/resend_phone': (req, res) => {
        const {uid} = req.body;
        return res.json({
            status: uid ? 1 : 0,
            message: "测试错误",
            data: {}
        });
    },
    'POST /api/v1/active/email': (req, res) => {
        const {code, uid} = req.body;
        return res.json({
            status: code === '8888' ? 1 : 0,
            message: code === '8888' ? "ok" : "邮件链接已失效" + uid,
            data: {}
        });
    },
    'POST /api/v1/active/phone': (req, res) => {
        const {code, uid} = req.body;
        return res.json({
            status: uid && code ? 1 : 0,
            message: "测试错误",
            data: {}
        });
    },
    'POST /api/v1/refund/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: [
                    {
                        trade_id: 'tr_M112d20820s11e14C16D',
                        merchant_order_no: new Date().getMilliseconds(),
                        email: req.body.trade_id + '@test.com',
                        payment_time: '2020-01-01 12:12:00',
                        order_amount: 135.89,
                        currency: 'USD',
                        refund_amount: 50.89,
                        apply_time: '2020-01-10 12:12:00',
                        refund_status: 16,//退款状态数值
                        refund_str: '待银行接收退款申请',//退款状态中文
                    },
                    {
                        trade_id: 'tr_893ufj4fjo2222',
                        merchant_order_no: '8983423',
                        email: req.body.refund_status + '@test.com',
                        payment_time: '2020-01-01 12:12:00',
                        order_amount: 135.89,
                        currency: 'USD',
                        refund_amount: 50.89,
                        apply_time: '2020-01-10 12:12:00',
                        refund_status: 16,//退款状态数值
                        refund_str: '待银行接收退款申请',//退款状态中文
                    },
                    {
                        trade_id: 'tr_893ufj4fjo33333',
                        merchant_order_no: '8983423',
                        email: req.body.page + '@test.com',
                        payment_time: '2020-01-01 12:12:00',
                        order_amount: 135.89,
                        currency: 'USD',
                        refund_amount: 50.89,
                        apply_time: '2020-01-10 12:12:00',
                        refund_status: 15,//退款状态数值
                        refund_str: '待银行接收退款申请',//退款状态中文
                    },
                ],
            }
        });
    },
}
let sleep = false;
// let sleep = true;// true 测试延迟响应
module.exports = sleep ? delay(proxy, 3000) : proxy;
//https://github.com/jaywcjlove/mocker-api
