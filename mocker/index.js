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
                notice: 0
            },
            token: "00e3c2a5d87a9e34ef2e879309cb1a31bf3dc56eb0f77fe4ba",
            menus: [
                {
                    "name": "home",
                    "path": "/",
                    "meta": null,
                    "children": null
                },
                {
                    "name": "profile",
                    "path": "/profile",
                    "meta": null,
                    "children": null
                },
                {
                    "name": "active_account",
                    "path": "/merchant/active_account",
                    "meta": null,
                    "children": null
                },
                {
                    "name": "trade_manage",
                    "path": "/trade/manage",
                    "meta": null,
                    "children": null
                },
                {
                    "name": "payout_select",
                    "path": "/payout/select",
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
                    ]
                },
                {
                    "name": "account_manage",
                    "path": "/account/manage",
                    "meta": null,
                    "children": null
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
            //'/api/v1/(.*)': 'https://165.wtpdev.com:38013',
            //'/api/v1/(.*)': 'http://localhost:8013',
            //'/api/v1/(.*)': 'http://192.168.3.182:8013',
        },
        changeHost: true,
        header: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        }
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
        const {password, username} = req.body;
        if (password === 'Test123456' && username === 'admin') {
            return res.json(demoUserInfo());
        } else {
            return res.status(200).json({
                status: 0,
                code: 4011,
                message: '登录失败',
                i18n: 'login.username.fail'
            });
        }
    },
    'POST /api/v1/register': (req, res) => {
        return res.json({
            status: 1,
            message: '注册成功',
            i18n: 'success',
        });
    },
    'POST /api/v1/user/info': (req, res) => {
        return res.json(demoUserInfo());
    },
    'GET /api/v1/profile': (req, res) => {
        let u = demoUserInfo();
        u.code = 7010;
        u.data.user.name = '77777'
        u.data.user.email = '77777'
        return res.json(u);
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({status: 'ok', message: '删除成功！'});
    }
}
module.exports = proxy;
//https://github.com/jaywcjlove/mocker-api
