const delay = require('mocker-api/lib/delay');

const proxyUrlSetting = {
    // Turn a path string such as `/user/:name` into a regular expression.
    // https://www.npmjs.com/package/path-to-regexp
    //'/api/v1/(.*)': 'https://portal.wintopay.com/'
    // '/api/v1/(.*)': 'https://165.wtpdev.com:38013',
    // '/api/v1/(.*)': 'http://192.168.3.182:8013',
    // '/api/v1/(.*)': 'http://127.0.0.1/',
    // '/images/(.*)': 'http://localhost:8013/',
    '/api/v1/(.*)': 'http://localhost:8013/',
}

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
                full_name: '张三',
                is_master: true,
                email: 'ljef@wintopay.cn',
                email_valid: true,
                phone: '13818181818',
                second_login: '2020-01-01 00:00:00',
                status: 1,
                identity_status: 1,
                bank_status: 0,
                mer_no: '4008',
                online: true,
                role_name: '管理员',
                notice_count: 12,
                popup: null,
                monitor_ecm: 0.2,//实时拒付率-当月(每月清)
                total_ecm: 0.3,//商户总拒付率
                total_declined_num: 5,//总拒付笔数
                allow_personal: 1, //商户是否允许认证为个人

            },
            token: "00e3c2a5d87a9e34ef2e879309cb1a31bf3dc56eb0f77fe4ba",
            menus: [
                {
                    "name": "home",
                    "path": "/",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "home_trade_report",
                            "path": "/report/last24Hours",
                            "meta": null,
                            "hidden": true
                        },
                        {
                            "name": "can_view_balance",
                            "path": "/merchant/balances",
                            "meta": null,
                            "hidden": true
                        }
                    ],
                    "have_show_child": false
                },
                {
                    "name": "active_account",
                    "path": "/merchant/active_account",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "trade_manage",
                    "path": "/trade/manage",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "refund_select",
                    "path": "/refund/search",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "decline_manage",
                    "path": "/decline/manage",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "payout_select",
                    "path": "/payout/search",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "payout_apply",
                            "path": "/payout/apply",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "payout_history",
                            "path": "/payout/history",
                            "meta": null,
                            "hidden": false
                        }
                    ],
                    "have_show_child": true
                },
                {
                    "name": "finance_select",
                    "path": "/finance/select",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "finance_search",
                            "path": "/finance/search",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "settle_search",
                            "path": "/settle/search",
                            "meta": null,
                            "hidden": false
                        }
                    ],
                    "have_show_child": true
                },
                {
                    "name": "fast_pay",
                    "path": "/fast_pay/index",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "delivery_manage",
                    "path": "/delivery/manage",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "delivery_download",
                            "path": "/delivery/download",
                            "meta": null,
                            "hidden": true
                        }
                    ],
                    "have_show_child": false
                },
                {
                    "name": "risk_manage",
                    "path": "/risk/manage",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "risk_area",
                            "path": "/risk/area",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "blacklist",
                            "path": "/risk/blacklist",
                            "meta": null,
                            "hidden": false
                        }
                    ],
                    "have_show_child": true
                },
                {
                    "name": "dispute_manage",
                    "path": "/dispute/manage",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "account_manage",
                    "path": "/account/manage",
                    "meta": null,
                    "hidden": false,
                    "children": [
                        {
                            "name": "merchant_info",
                            "path": "/merchant/info",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "merchant_identity",
                            "path": "/merchant/identity",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "merchant_setup",
                            "path": "/merchant/setup",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "merchant_users",
                            "path": "/merchant/users",
                            "meta": null,
                            "hidden": false
                        },
                        {
                            "name": "merchant_shop",
                            "path": "/merchant/shop",
                            "meta": null,
                            "hidden": false
                        }
                    ],
                    "have_show_child": true
                },
                {
                    "name": "support_ticket",
                    "path": "/support/ticket",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                },
                {
                    "name": "message_center",
                    "path": "/message/center",
                    "meta": null,
                    "hidden": false,
                    "children": null,
                    "have_show_child": false
                }
            ],
            permissions: [
                "home_trade_report",
                "can_view_balance",
                "delivery_download"
            ],
        }
    };
}

function demoOrderList(req) {
    return [
        {
            trade_id: 'tr_M112d20820s11e14C16D',
            merchant_order_no: new Date().getMilliseconds() + 'wef2fv23433d',
            email: req.body.trade_id + '@test.com',
            payment_time: '2020-01-01 12:12:00',
            order_amount: 135.89,
            currency: 'USD',
            refund_amount: 50.89,
            apply_time: '2020-01-10 12:12:00',
            refund_status: 16,//退款状态数值
            refund_str: '待银行接收退款申请',//退款状态中文
            pay_status: 'paid',
            settlement_amount: 782.23,
            settlement_currency: 'CNY',
            is_declined: 1,
            is_settled: 1,
            delivery_status: 0,
            track_number: '97298348203824',
            track_brand: 'DHL',
            shipment_reason: '运输途中',
            decline_time: '2020-01-10 12:12:00',
            decline_reason: '货物不对',
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
            pay_status: 'pending',
            settlement_amount: 309.23,
            settlement_currency: 'CNY',
            is_declined: 0,
            is_settled: 0,
            delivery_status: 0,
            track_number: 'LH719441879CN',
            track_brand: 'DHL',
            shipment_reason: '',
            decline_time: '2020-01-10 12:12:00',
            decline_reason: '货物不对',
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
            pay_status: 'failed',
            settlement_amount: 673.23,
            settlement_currency: 'CNY',
            is_declined: 0,
            is_settled: 0,
            delivery_status: 0,
            track_number: '',
            track_brand: '',
            shipment_reason: '',
            decline_time: '2020-01-10 12:12:00',
            decline_reason: '货物不对',
        },
        {
            trade_id: 'tr_893ufj4fjo4355',
            merchant_order_no: '8983423',
            email: req.body.page + '@test.com',
            payment_time: '2020-01-01 12:12:00',
            order_amount: 135.89,
            currency: 'USD',
            refund_amount: 50.89,
            apply_time: '2020-01-10 12:12:00',
            refund_status: 15,//退款状态数值
            refund_str: '待银行接收退款申请',//退款状态中文
            pay_status: 'canceled',
            settlement_amount: 673.23,
            settlement_currency: 'CNY',
            is_declined: 0,
            is_settled: 0,
            delivery_status: 0,
            track_number: '',
            track_brand: '',
            shipment_reason: '',
            decline_time: '2020-01-10 12:12:00',
            decline_reason: '货物不对',
        },
    ];
}

function demoOrderInfo() {
    return [
        {
            "trade_id": "tr_M1130a0807s4C53263jC",
            "merchant_order_no": "test1596802208",
            "order_currency": "USD",
            "order_amount": 722.76,
            "settle_currency": "CNY",
            "settle_amount": 5018.05,
            "fees": -250.9,
            "risk_fees": -2.08,
            "refund_total": -34,
            "refunded": 2,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a080736J9DF2C2RnVsj",
            "payment_time": "2020-08-07 20:10:14",
            "created_time": "2020-08-07 20:10:09",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "product_json": "v8ef34weo5wej5fwo",
            "delivery_status": 1,
            "track_number": "TESTUoIiqtrXp1",
            "track_brand": "dhl",
            "virtual_ship": "1",
            "meta_data": null,
            "bill_address": "ws2ef*sss",
            "customer": {
                "cch_id": "cch_M1130a080719E7J26g2G",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "phone": "64-914-927-1096",
                "email": "Brandt_Moore@gmail.com",
                "first_name": "Oda",
                "last_name": "Swift",
                "country": "MO",
                "state": "Schmidttown",
                "city": "New Jorgeville",
                "address": "2961 Howard Squares",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Alva_Rosenbaum31@hotmail.com",
                "shipping_first_name": "Jaqueline",
                "shipping_last_name": "Borer",
                "shipping_country": "SC",
                "shipping_state": "Kentucky",
                "shipping_city": "South Burley",
                "shipping_address": "152 Skye Coves",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802212000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "brand": "visa",
                "email": "Brandt_Moore@gmail.com",
                "name": "Oda Swift",
                "phone_number": "64-914-927-1096",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "MO",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "status": 1,
                "created": 1596802212000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a08072105519107",
            "merchant_order_no": "test1596802223",
            "order_currency": "USD",
            "order_amount": 742.94,
            "settle_currency": "CNY",
            "settle_amount": 5158.15,
            "fees": -257.9,
            "risk_fees": -2.08,
            "refund_total": -553,
            "refunded": 2,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a080714e5ee073AZMc7",
            "payment_time": "2020-08-07 20:10:25",
            "created_time": "2020-08-07 20:10:22",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTBA6sVMynMW",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a080711D8b8013D",
                "trade_id": "tr_M1130a08072105519107",
                "cc_id": "cc_M1130a08076560B39E8c",
                "phone": "1-425-165-1317",
                "email": "Winnifred70@hotmail.com",
                "first_name": "Erna",
                "last_name": "Sauer",
                "country": "TC",
                "state": "Hoegerchester",
                "city": "West Jakobmouth",
                "address": "8589 Kaylin Groves",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Orland.Stokes@gmail.com",
                "shipping_first_name": "Malvina",
                "shipping_last_name": "Dach",
                "shipping_country": "SV",
                "shipping_state": "Kentucky",
                "shipping_city": "Martinaview",
                "shipping_address": "732 Deonte Throughway",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802224000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a08076560B39E8c",
                "brand": "visa",
                "email": "Winnifred70@hotmail.com",
                "name": "Erna Sauer",
                "phone_number": "1-425-165-1317",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "TC",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a08072105519107",
                "status": 1,
                "created": 1596802224000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a0807s506B65567",
            "merchant_order_no": "test1596802228",
            "order_currency": "USD",
            "order_amount": 85.2,
            "settle_currency": "CNY",
            "settle_amount": 591.53,
            "fees": -29.57,
            "risk_fees": -2.08,
            "refund_total": 0,
            "refunded": 0,
            "declined": 1,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a0807s12144GEk4yPTV",
            "payment_time": "2020-08-07 20:10:31",
            "created_time": "2020-08-07 20:10:28",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTY6LPBCzQ24",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a0807167K3AJ64a",
                "trade_id": "tr_M1130a0807s506B65567",
                "cc_id": "cc_M1130a0807s1BEd616e7",
                "phone": "26-006-003-5705",
                "email": "Lyla_Wunsch@hotmail.com",
                "first_name": "Valentine",
                "last_name": "Anderson",
                "country": "LS",
                "state": "East Virginia",
                "city": "Tressieton",
                "address": "914 Kaylah Islands",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Giles75@yahoo.com",
                "shipping_first_name": "Caleb",
                "shipping_last_name": "Ritchie",
                "shipping_country": "GF",
                "shipping_state": "Kentucky",
                "shipping_city": "Brownburgh",
                "shipping_address": "878 Celia Mountain",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802230000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s1BEd616e7",
                "brand": "visa",
                "email": "Lyla_Wunsch@hotmail.com",
                "name": "Valentine Anderson",
                "phone_number": "26-006-003-5705",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "LS",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s506B65567",
                "status": 1,
                "created": 1596802230000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a0807177g691Cb4",
            "merchant_order_no": "test1596802234",
            "order_currency": "USD",
            "order_amount": 662.34,
            "settle_currency": "CNY",
            "settle_amount": 4598.56,
            "fees": -229.92,
            "risk_fees": -2.08,
            "refund_total": 0,
            "refunded": 0,
            "declined": 1,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a0807328951E5bZDIBI",
            "payment_time": "2020-08-07 20:10:37",
            "created_time": "2020-08-07 20:10:33",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTbVp5GdArT7",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a080796J9041B4z",
                "trade_id": "tr_M1130a0807177g691Cb4",
                "cc_id": "cc_M1130a0807s738DDkaB8",
                "phone": "61-825-947-1402",
                "email": "Ursula_Lesch32@gmail.com",
                "first_name": "Ibrahim",
                "last_name": "Hettinger",
                "country": "TM",
                "state": "Bradtkeburgh",
                "city": "East Maryam",
                "address": "1113 Sanford Key",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Jalyn85@yahoo.com",
                "shipping_first_name": "Albertha",
                "shipping_last_name": "Rice",
                "shipping_country": "BO",
                "shipping_state": "Kentucky",
                "shipping_city": "South Anika",
                "shipping_address": "70135 Muriel Square",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802234000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s738DDkaB8",
                "brand": "DClub",
                "email": "Ursula_Lesch32@gmail.com",
                "name": "Ibrahim Hettinger",
                "phone_number": "61-825-947-1402",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "TM",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807177g691Cb4",
                "status": 1,
                "created": 1596802234000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a0807s1KBjb5chB",
            "merchant_order_no": "test1596806908",
            "order_currency": "USD",
            "order_amount": 971.98,
            "settle_currency": "CNY",
            "settle_amount": 6748.35,
            "fees": -337.41,
            "risk_fees": -2.08,
            "refund_total": 0,
            "refunded": 0,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a0807189Ch3jbBAawWO",
            "payment_time": "2020-08-07 21:28:37",
            "created_time": "2020-08-07 21:28:29",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTx6GhQat7R2",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a0807s142d43G65",
                "trade_id": "tr_M1130a0807s1KBjb5chB",
                "cc_id": "cc_M1130a0807s20KeFaF5G",
                "phone": "72-404-517-2483",
                "email": "Hardy22@gmail.com",
                "first_name": "Hilda",
                "last_name": "McKenzie",
                "country": "SC",
                "state": "Lakinside",
                "city": "Lednerview",
                "address": "838 Larkin Crossroad",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Rossie.Skiles@hotmail.com",
                "shipping_first_name": "Morton",
                "shipping_last_name": "Stehr",
                "shipping_country": "TR",
                "shipping_state": "Kentucky",
                "shipping_city": "Port Lelia",
                "shipping_address": "28094 Loraine Cape",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596806913000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s20KeFaF5G",
                "brand": "mastercard",
                "email": "Hardy22@gmail.com",
                "name": "Hilda McKenzie",
                "phone_number": "72-404-517-2483",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "SC",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s1KBjb5chB",
                "status": 1,
                "created": 1596806913000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a0807s25H9dC7G4",
            "merchant_order_no": "test1596806924",
            "order_currency": "USD",
            "order_amount": 885.23,
            "settle_currency": "CNY",
            "settle_amount": 6146.06,
            "fees": -307.3,
            "risk_fees": -2.08,
            "refund_total": 0,
            "refunded": 0,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a0807s5k2eB4265un20",
            "payment_time": "2020-08-07 21:28:54",
            "created_time": "2020-08-07 21:28:43",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTXz7TlOFYxu",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a0807s8A6d4K0jB",
                "trade_id": "tr_M1130a0807s25H9dC7G4",
                "cc_id": "cc_M1130a0807s21EdA1G0d",
                "phone": "53-825-277-2551",
                "email": "Brendan57@gmail.com",
                "first_name": "Magnolia",
                "last_name": "Grimes",
                "country": "CR",
                "state": "Port Ritashire",
                "city": "Aronstad",
                "address": "1152 Laury Knoll",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Deondre.Kris@yahoo.com",
                "shipping_first_name": "Paxton",
                "shipping_last_name": "Durgan",
                "shipping_country": "MF",
                "shipping_state": "Kentucky",
                "shipping_city": "Felipechester",
                "shipping_address": "4385 Skiles Brooks",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596806932000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s21EdA1G0d",
                "brand": "ae",
                "email": "Brendan57@gmail.com",
                "name": "Magnolia Grimes",
                "phone_number": "53-825-277-2551",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "CR",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s25H9dC7G4",
                "status": 1,
                "created": 1596806932000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        },
        {
            "trade_id": "tr_M1130a0807s15hf1KCeb",
            "merchant_order_no": "test1596807124",
            "order_currency": "USD",
            "order_amount": 475.42,
            "settle_currency": "CNY",
            "settle_amount": 3300.79,
            "fees": -165.03,
            "risk_fees": -2.08,
            "refund_total": 0,
            "refunded": 0,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a0807s1gdG0b4j8aW00",
            "payment_time": "2020-08-07 21:32:07",
            "created_time": "2020-08-07 21:32:04",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 2,
            "track_number": "TEST52L9zEV0o8",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a0807s543FJ1218",
                "trade_id": "tr_M1130a0807s15hf1KCeb",
                "cc_id": "cc_M1130a0807s2e4JkbE8d",
                "phone": "44-415-162-3517",
                "email": "Lessie58@yahoo.com",
                "first_name": "Derrick",
                "last_name": "Tromp",
                "country": "IO",
                "state": "Lake Preston",
                "city": "Port Eribertomouth",
                "address": "37828 Santos Brooks",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Martina_Barrows36@hotmail.com",
                "shipping_first_name": "Samson",
                "shipping_last_name": "Schoen",
                "shipping_country": "CK",
                "shipping_state": "Kentucky",
                "shipping_city": "Lilianamouth",
                "shipping_address": "29032 Barrows Knolls",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596807125000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s2e4JkbE8d",
                "brand": "jcb",
                "email": "Lessie58@yahoo.com",
                "name": "Derrick Tromp",
                "phone_number": "44-415-162-3517",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "IO",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s15hf1KCeb",
                "status": 1,
                "created": 1596807125000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            }
        }
    ];
}

function demoOrderInfoDecline() {
    return [
        {
            "trade_id": "tr_M1130a0807s4C53263jC",
            "merchant_order_no": "test1596802208",
            "order_currency": "USD",
            "order_amount": 722.76,
            "settle_currency": "CNY",
            "settle_amount": 5018.05,
            "fees": -250.9,
            "risk_fees": -2.08,
            "refund_total": -34,
            "refunded": 2,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a080736J9DF2C2RnVsj",
            "payment_time": "2020-08-07 20:10:14",
            "created_time": "2020-08-07 20:10:09",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTUoIiqtrXp1",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a080719E7J26g2G",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "phone": "64-914-927-1096",
                "email": "Brandt_Moore@gmail.com",
                "first_name": "Oda",
                "last_name": "Swift",
                "country": "MO",
                "state": "Schmidttown",
                "city": "New Jorgeville",
                "address": "2961 Howard Squares",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Alva_Rosenbaum31@hotmail.com",
                "shipping_first_name": "Jaqueline",
                "shipping_last_name": "Borer",
                "shipping_country": "SC",
                "shipping_state": "Kentucky",
                "shipping_city": "South Burley",
                "shipping_address": "152 Skye Coves",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802212000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "brand": "visa",
                "email": "Brandt_Moore@gmail.com",
                "name": "Oda Swift",
                "phone_number": "64-914-927-1096",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "MO",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "status": 1,
                "created": 1596802212000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            },
            chargeback: {
                reason: 'fwe3f3oie45jw4fw',
                decline_type: 'customerService',//fraud
                chargeback_time: '2020-01-01 10:10:10',
            },
        },
    ];
}

function demoOrderInfoRefund() {
    return [
        {
            "trade_id": "tr_M1130a0807s4C53263jC",
            "merchant_order_no": "test1596802208",
            "order_currency": "USD",
            "order_amount": 722.76,
            "settle_currency": "CNY",
            "settle_amount": 5018.05,
            "fees": -250.9,
            "risk_fees": -2.08,
            "refund_total": -34,
            "refunded": 2,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a080736J9DF2C2RnVsj",
            "payment_time": "2020-08-07 20:10:14",
            "created_time": "2020-08-07 20:10:09",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTUoIiqtrXp1",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a080719E7J26g2G",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "phone": "64-914-927-1096",
                "email": "Brandt_Moore@gmail.com",
                "first_name": "Oda",
                "last_name": "Swift",
                "country": "MO",
                "state": "Schmidttown",
                "city": "New Jorgeville",
                "address": "2961 Howard Squares",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Alva_Rosenbaum31@hotmail.com",
                "shipping_first_name": "Jaqueline",
                "shipping_last_name": "Borer",
                "shipping_country": "SC",
                "shipping_state": "Kentucky",
                "shipping_city": "South Burley",
                "shipping_address": "152 Skye Coves",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802212000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "brand": "visa",
                "email": "Brandt_Moore@gmail.com",
                "name": "Oda Swift",
                "phone_number": "64-914-927-1096",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "MO",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "status": 1,
                "created": 1596802212000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            },
            refund_amount: 24.3,
            refund_status: "applyRefund",
            apply_time: "2020-08-07 20:10:09",
            refund_info: '',
        },
        {
            "trade_id": "tr_M1130a0807s4C53263jC",
            "merchant_order_no": "test1596802208",
            "order_currency": "USD",
            "order_amount": 722.76,
            "settle_currency": "CNY",
            "settle_amount": 5018.05,
            "fees": -250.9,
            "risk_fees": -2.08,
            "refund_total": -34,
            "refunded": 13,
            "declined": 0,
            "settled": 0,
            "deposit_settled": 0,
            "payment_id": "py_M1130a080736J9DF2C2RnVsj",
            "payment_time": "2020-08-07 20:10:14",
            "created_time": "2020-08-07 20:10:09",
            "pay_status": "paid",
            "reason": null,
            "site_url": "www.iioffer.vip",
            "ip": "58.24.127.131",
            "products": null,
            "delivery_status": 1,
            "track_number": "TESTUoIiqtrXp1",
            "track_brand": "dhl",
            "meta_data": null,
            "customer": {
                "cch_id": "cch_M1130a080719E7J26g2G",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "phone": "64-914-927-1096",
                "email": "Brandt_Moore@gmail.com",
                "first_name": "Oda",
                "last_name": "Swift",
                "country": "MO",
                "state": "Schmidttown",
                "city": "New Jorgeville",
                "address": "2961 Howard Squares",
                "zip_code": "40511",
                "shipping_phone": "13323904176",
                "shipping_email": "Alva_Rosenbaum31@hotmail.com",
                "shipping_first_name": "Jaqueline",
                "shipping_last_name": "Borer",
                "shipping_country": "SC",
                "shipping_state": "Kentucky",
                "shipping_city": "South Burley",
                "shipping_address": "152 Skye Coves",
                "shipping_zip_code": "40511",
                "device_id": null,
                "ip": "58.24.127.131",
                "ip_country": "CN",
                "status": 1,
                "created": 1596802212000,
                "captured": null,
                "remark": null
            },
            "card": {
                "cc_id": "cc_M1130a0807s1C2A8ehgD",
                "brand": "visa",
                "email": "Brandt_Moore@gmail.com",
                "name": "Oda Swift",
                "phone_number": "64-914-927-1096",
                "currency": "USD",
                "card64": "424242***4242",
                "country_iso2": "MO",
                "last4": "4242",
                "bin": "424242",
                "ip": "58.24.127.131",
                "trade_id": "tr_M1130a0807s4C53263jC",
                "status": 1,
                "created": 1596802212000,
                "cvc_check": null,
                "fingerprint": "f0675a9bd94dc476"
            },
            refund_amount: 24.3,
            refund_status: "waitBankReceive",
            apply_time: "2020-08-07 20:10:09",
            refund_info: '',
        },
    ];
}

function demoFinanceList(req) {
    return [
        {
            trade_id: 'tr_700370918s2141j1s' + req.body.finance_status,
            batch_id: 'b23ou82f2' + new Date().getMilliseconds(),
            merchant_order_no: 'wef2fv23433d' + new Date().getMilliseconds(),
            kind: 'sale',
            currency: 'USD',
            fees: 2.31,
            fixed_fees: 3.21,
            charge: 234.32,
            deposit_charge: 0,
            surplus: 454645.45,
            deposit_surplus: 8963132.45,
            charge_time: '2020-01-01 12:12:00',
        },
        {
            trade_id: 'tr_Mw8we8r1e1' + req.body.finance_status,
            batch_id: 'b23ou82f2' + new Date().getMilliseconds(),
            merchant_order_no: new Date().getMilliseconds(),
            kind: 'sale',
            currency: 'USD',
            fees: 0,
            fixed_fees: 3.2,
            charge: 344,
            deposit_charge: 0,
            surplus: 45425.45,
            deposit_surplus: 8962432.45,
            charge_time: '2020-01-01 12:12:00',
        },
    ];
}

function demoSettleList(req) {
    return [
        {
            batch_id: 'b23ou82f2' + new Date().getMilliseconds() + req.body.batch_id,
            kind: 'trade',
            currency: 'USD',
            fee_amount: 5.5,
            net_amount: 234.32,
            created: '2020-01-01 12:12:00',
            payout_time: '2020-01-01 12:12:00',//划款时间
            status: 'paid', //paid
        },
        {
            batch_id: 'bth45y4' + new Date().getMilliseconds() + req.body.batch_id,
            kind: 'deposit',
            currency: 'CNY',
            fee_amount: 0,
            net_amount: 2342223.32,
            created: '2020-01-01 12:12:00',
            payout_time: '',//划款时间
            status: 'release', //paid
        },
        {
            batch_id: 'b67j6e' + new Date().getMilliseconds() + req.body.finance_status,
            kind: 'trade',
            currency: 'USD',
            fee_amount: 0,
            net_amount: 2342.32,
            created: '2020-01-01 12:12:00',
            payout_time: '',//划款时间
            status: 'release', //paid
        },
    ];
}

const proxy = {
    // Priority processing.
    // apiMocker(app, path, option)
    // This is the option parameter setting for apiMocker
    _proxy: {
        proxy: proxyUrlSetting,
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
    'GET /api/:owner/:repo/raw/:ref/(.*)': (req, res) => { //demo 参数的使用
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
        const {username} = req.body;
        if (username === 'admin') {
            return res.json(demoUserInfo());
            if (req.body.valid_sig) {
                return res.json(demoUserInfo());
            } else {
                if (req.body.mer_no === '4008') {
                    return res.status(200).json({
                        status: 0,
                        code: 7003,
                        message: '认证 ' + new Date().getMilliseconds(),
                        data: demoUserInfo().data,
                        i18n: 'login.username.fail'
                    });
                } else {
                    return res.status(200).json({
                        status: 0,
                        code: 7002,
                        message: '登录失败 ' + new Date().getMilliseconds(),
                        i18n: 'login.username.fail'
                    });
                }
            }
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
            // status: req.body.valid_sig ? 1 : 0,
            // code: req.body.valid_sig ? 0 : 7002,
            status: 1,
            message: '注册成功',
            data: demoUserInfo().data,
            i18n: 'success',
        });
    },
    'POST /api/v1/verify_code/resend_email': (req, res) => {
        return res.json({
            status: 1,
            message: '发送成功',
            i18n: 'success',
        });
    },
    'POST /api/v1/user/info': (req, res) => {
        return res.json(demoUserInfo());
    },
    'GET /api/v1/user/info': (req, res) => {
        return res.json(demoUserInfo());
    },
    'GET /api/v1/profile': (req, res) => {
        let u = demoUserInfo();
        u.code = 7010;
        u.data.user.email = 'N' + u.data.user.email
        u.data.user.notice_count = 0
        return res.json(u);
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({status: 'ok', message: '删除成功！'});
    },
    'POST /api/v1/password/forget/resend_code': (req, res) => {
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
    'POST /api/v1/password/forget/valid_phone_code': (req, res) => {
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
    'POST /api/v1/password/update': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/password/update_with_safe': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/password/update_with_expire': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/email/update': (req, res) => {
        return res.json(demoUserInfo());
    },
    'POST /api/v1/verify_code/resend_phone': (req, res) => {
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
    //--
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
                list: demoOrderInfoRefund(),
            }
        });
    },
    'POST /api/v1/refund/search/v2': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderInfoRefund(),
            }
        });
    },
    'POST /api/v1/refund/apply': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/merchant/role/user/site': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/merchant/role/site/save': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/refund/cancel': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        });
    },
    'POST /api/v1/payout/wait/apply': (req, res) => { //可申请结算的订单列表
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderInfo(),
            }
        });
    },
    'POST /api/v1/payout/apply': (req, res) => { //提交申请
        return res.json({
            status: 1,
            message: '提交申请成功',
            data: {}
        });
    },
    //结算列表查询 根据 payout_status( submitted 已提交, reject 问题单 )
    'POST /api/v1/payout/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderList(req),
            }
        });
    },
    'POST /api/v1/payout/search/v2': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderList(req),
            }
        });
    },
    'POST /api/v1/decline/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderInfoDecline(),
            }
        });
    },
    'POST /api/v1/finance/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoFinanceList(req),
            }
        });
    },
    'POST /api/v1/settle/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoSettleList(req),
            }
        });
    },
    'POST /api/v1/settle/summary': (req, res) => {
        return res.json({
            "status": 1,
            "message": null,
            "code": null,
            "i18n": null,
            "error": {},
            "data": {
                "bank": null,
                "payout": {
                    "batch_id": "b09251571G6F6d6",
                    "bank_id": null,
                    "net_amount": 8398.74,
                    "guarantee_amount": null,
                    "sale_amount": 8398.74,
                    "fee_amount": -494.27,
                    "fixed_fee_amount": -4.16,
                    "chargeback_amount": null,
                    "refund_amount": null,
                    "misc_amount": 0,
                    "kind": "trade",
                    "payout_time": null,
                    "invoice": null,
                    "currency": "CNY",
                    "fees": 0,
                    "order_count": 2,
                    "deposit_amount": 988.56,
                    "settle_day": "20200925",
                    "mer_no": "70122",
                    "total": 8398.74,
                    "kind_str": "交易结算",
                    "status_str": "已发布",
                    "settled": false,
                    "canceled": false,
                    "released": true
                },
                "groups": [{
                    "kind": "sale",
                    "currency": "CNY",
                    "count": 2,
                    "charge": 8398.74,
                    "fees": -494.27,
                    "fixed_fees": -4.16,
                    "order_settle": 9885.73,
                    "deposit_charge": -988.56,
                    "kind_str": "收款"
                }]
            },
            "request_id": "req_H09yBJEoql"
        });
    },
    'POST /api/v1/settle/view_detail': (req, res) => {
        return res.json({
            status: 1,
            message: 'xf23',
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoFinanceList(req),
            }
        });
    },
    'POST /api/v1/fast_pay/search': (req, res) => {
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
                        "fy_token": "fys7h1K4A50Hbe4hfeglG1plH7i1SPvq",
                        "site_id": null,
                        "order_id": "f232424",
                        "amount": 34,
                        "currency": "USD",
                        "order_description": "rthrthrthr",
                        "operator": "uid_091816K0h7j079v5aYug",
                        "cch_id": null,
                        "status": 1,
                        "remark": null,
                        "order_title": "2g4hthh",
                        "language": "en",
                        "created": 1614103197000,
                        "products": [
                            {
                                "id": 1,
                                "itemId": null,
                                "mid": 86,
                                "sku": null,
                                "name": "ergerg",
                                "amount": "234",
                                "currency": "USD",
                                "quantity": 1,
                                "source": "fast_pay",
                                "tradeId": null,
                                "fyToken": "fys7h1K4A50Hbe4hfeglG1plH7i1SPvq",
                                "created": 1614103188000,
                                "operator": null
                            },
                            {
                                "id": 2,
                                "itemId": null,
                                "mid": 86,
                                "sku": null,
                                "name": "43t24t 34t 34t34t",
                                "amount": "45",
                                "currency": "USD",
                                "quantity": 1,
                                "source": "fast_pay",
                                "tradeId": null,
                                "fyToken": "fys7h1K4A50Hbe4hfeglG1plH7i1SPvq",
                                "created": 1614103191000,
                                "operator": null
                            }
                        ]
                    }
                ]
            }
        });
    },
    'POST /api/v1/fast_pay/new': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/delivery/search': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderList(req),
            }
        });
    },
    'POST /api/v1/delivery/search/v2': (req, res) => {
        return res.json({
            status: 1,
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: demoOrderList(req),
            }
        });
    },
    'POST /api/v1/delivery/new': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                track_brand: 'DHL',
                track_number: '2lfj23f',
            }
        });
    },
    'GET /api/v1/delivery/brand/all': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                list: [
                    {
                        "text": "4PX",
                        "value": "FOUR_PX"
                    },
                    {
                        "text": "APC Postal Logistics",
                        "value": "APC"
                    },
                    {
                        "text": "Anjun Logistics",
                        "value": "ANJUN"
                    },
                    {
                        "text": "Australia Post",
                        "value": "AUSTRALIA_POST"
                    },
                    {
                        "text": "Bluedart",
                        "value": "BLUEDART"
                    },
                    {
                        "text": "Canada Post",
                        "value": "CANADA_POST"
                    },
                    {
                        "text": "Canpar Courier",
                        "value": "CANPAR_COURIER"
                    },
                    {
                        "text": "China Post",
                        "value": "CHINA_POST"
                    },
                    {
                        "text": "China EMS",
                        "value": "CHINA_EMS"
                    },
                    {
                        "text": "Chukou1 Logistics",
                        "value": "CHUKOU1"
                    },
                    {
                        "text": "Brazil Correios",
                        "value": "BRAZIL_CORREIOS"
                    },
                    {
                        "text": "Couriers Please",
                        "value": "COURIERS_PLEASE"
                    },
                    {
                        "text": "DHL",
                        "value": "DHL"
                    },
                    {
                        "text": "DHL eCommerce",
                        "value": "DHL_ECOMMERCE"
                    },
                    {
                        "text": "DPD",
                        "value": "DPD"
                    },
                    {
                        "text": "DPD UK",
                        "value": "DPD_UK"
                    },
                    {
                        "text": "Delhivery",
                        "value": "DELHIVERY"
                    },
                    {
                        "text": "Fedex",
                        "value": "FEDEX"
                    },
                    {
                        "text": "GLS",
                        "value": "GLS"
                    },
                    {
                        "text": "Globegistics Inc",
                        "value": "GLOBEGISTICS"
                    },
                    {
                        "text": "Japan Post",
                        "value": "JAPAN_POST"
                    },
                    {
                        "text": "New Zealand Post",
                        "value": "NEW_ZEALAND_POST"
                    },
                    {
                        "text": "Netherlands Post - PostNL",
                        "value": "POSTNL"
                    },
                    {
                        "text": "Purolator",
                        "value": "PUROLATOR"
                    },
                    {
                        "text": "SF Express",
                        "value": "SF_EXPRESS"
                    },
                    {
                        "text": "SFC Service",
                        "value": "SFC_SERVICE"
                    },
                    {
                        "text": "Sagawa",
                        "value": "SAGAWA"
                    },
                    {
                        "text": "Sendle",
                        "value": "SENDLE"
                    },
                    {
                        "text": "Singapore Post",
                        "value": "SINGAPORE_POST"
                    },
                    {
                        "text": "TNT",
                        "value": "TNT"
                    },
                    {
                        "text": "Toll IPEC",
                        "value": "TOLL_IPEC"
                    },
                    {
                        "text": "UPS",
                        "value": "UPS"
                    },
                    {
                        "text": "USPS",
                        "value": "USPS"
                    },
                    {
                        "text": "Yamato Japan",
                        "value": "YAMATO_JAPAN"
                    },
                    {
                        "text": "Yun Express",
                        "value": "YUN_EXPRESS"
                    },
                    {
                        "text": "其他",
                        "value": "OTHER"
                    },
                ]
            }
        });
    },
    'GET /api/v1/delivery/virtual/status': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                is_virtual: true
            }
        });
    },
    'POST /api/v1/delivery/virtual/batch_auto_ship': (req, res) => {
        return res.json({
            status: 1,
            message: '系统自动填单完成 33 笔虚拟交易订单',
            data: {}
        });
    },
    'POST /api/v1/risk_area/search': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: [
                    {
                        country_name: '美国',
                        state_name: 'state ' + new Date().getMilliseconds(),
                        rai: 'rai_32234598j' + new Date().getMilliseconds(),
                        status: 0,
                        operator_name: '张一',
                        updated: '2020-09-09 00:00:00'
                    },
                    {
                        country_name: '美国', state_name: 'state 233', rai: 'rai_322129yg',
                        status: 1, operator_name: '张一', updated: '2020-09-09 00:00:00'
                    },
                    {
                        country_name: '美国', state_name: 'state 233', rai: 'rai_32234598j',
                        status: 1, operator_name: '张一', updated: '2020-09-09 00:00:00'
                    }
                ]
            }
        });
    },
    'POST /api/v1/risk_area/add': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                country_name: '美国', state_name: 'state 233', rai: 'rai_32234598j',
                status: 1, operator_name: '张一', updated: '2020-09-09 00:00:00'
            }
        });
    },
    'POST /api/v1/risk_area/disable': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/risk_area/enable': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'DELETE /api/v1/risk_area/delete': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'GET /api/v1/order/get/:id': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: demoOrderInfo()[0],
        });
    },
    'GET /api/v1/order/timeline/:id': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                "list": [
                    {
                        "otl_id": "otl_0807532B6cjf0miciMie",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "settle",
                        "title": "pass",
                        "created_time": 1596802345000,
                        "transaction": {
                            "py_id": "py_M1130a080716KjF484k71hv7",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "settle",
                            "status": "pass",
                            "amount": 5018.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": null,
                            "created": 1596802338000,
                            "reason": null,
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_0807532B6cjf0miciMie",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "payment_failed",
                        "title": "payment_failed",
                        "created_time": 1596802345000,
                        "transaction": {
                            "py_id": "py_M1130a080716KjF484k71hv7",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "settle",
                            "status": "pass",
                            "amount": 5018.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": '23424324',
                            "fail_message": 'payment_failedddddd',
                            "pay_date": null,
                            "created": 1596802338000,
                            "reason": null,
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_0807s12kh7ceKAkZtcQM",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "shipment_info",
                        "title": "pass",
                        "created_time": 1596802341000,
                        "transaction": null
                    },
                    {
                        "otl_id": "otl_08071562e418c2D68NMi",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "settle",
                        "title": "applySettle",
                        "created_time": 1596802338000,
                        "transaction": {
                            "py_id": "py_M1130a080716KjF484k71hv7",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "settle",
                            "status": "pass",
                            "amount": 5018.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": null,
                            "created": 1596802338000,
                            "reason": null,
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_0807731b05jCjY9cj7Vm",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "shipment_info",
                        "title": "submitted",
                        "created_time": 1596802333000,
                        "transaction": null
                    },
                    {
                        "otl_id": "otl_080713Ggjk3958MYwtqG",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "refund",
                        "title": "bankAcceptRefund",
                        "created_time": 1596802311000,
                        "transaction": {
                            "py_id": "py_M1130a080754j580dD762nCg",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "refund",
                            "status": "bankAcceptRefund",
                            "amount": -236.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": null,
                            "created": 1596802281000,
                            "reason": "申请部份退款金额 34 USD",
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_0807s7986J10g1JlSsWZ",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "refund",
                        "title": "waitBankReceive",
                        "created_time": 1596802298000,
                        "transaction": {
                            "py_id": "py_M1130a080754j580dD762nCg",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "refund",
                            "status": "bankAcceptRefund",
                            "amount": -236.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": null,
                            "created": 1596802281000,
                            "reason": "申请部份退款金额 34 USD",
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_080720Ae50C94dCyh3Nc",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "refund",
                        "title": "applyRefund",
                        "created_time": 1596802281000,
                        "transaction": {
                            "py_id": "py_M1130a080754j580dD762nCg",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "refund",
                            "status": "bankAcceptRefund",
                            "amount": -236.05,
                            "currency": "CNY",
                            "ch_id": null,
                            "cr_id": null,
                            "fees": 0,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": null,
                            "created": 1596802281000,
                            "reason": "申请部份退款金额 34 USD",
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_080715AH1b0140YdDgfp",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "payment_paid",
                        "title": null,
                        "created_time": 1596802215000,
                        "transaction": {
                            "py_id": "py_M1130a080736J9DF2C2RnVsj",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "kind": "ccpay",
                            "status": "paid",
                            "amount": 5018.05,
                            "currency": "CNY",
                            "ch_id": "ch_eYSBp3Xl",
                            "cr_id": "cr_nikRBsLW5",
                            "fees": -250.9,
                            "fail_code": null,
                            "fail_message": null,
                            "pay_date": 1596802214000,
                            "created": 1596802213000,
                            "reason": null,
                            "mer_uid": null,
                            "updated": null
                        }
                    },
                    {
                        "otl_id": "otl_080712Egb0kg8C5OQPgQ",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "start_payment",
                        "title": null,
                        "created_time": 1596802214000,
                        "transaction": null
                    },
                    {
                        "otl_id": "otl_080717g7H0AhCjwjzYDU",
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "kind": "created_order",
                        "title": null,
                        "created_time": 1596802212000,
                        "transaction": null
                    }
                ]
            }
        });
    },
    'POST /api/v1/blacklist/search': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: [
                    {
                        mri: 'ef2f34g',
                        kind: "address",
                        value: "上海",
                        operator_name: "jian",
                        trade_id: null,
                        created: "2020-08-29 20:49:19",
                        remark: "3g4Test",
                        updated: "2020-08-29 20:49:19",
                        pack_hash: "913624534d668192",
                        status: 1,
                    }, {
                        mri: '9384g3gf4',
                        kind: "phone",
                        value: "13888888888",
                        operator_name: "jian",
                        trade_id: 'tr_wf23frg2fwef',
                        created: "2020-08-29 20:49:19",
                        remark: "3g2224Test",
                        updated: "2020-08-29 20:49:19",
                        pack_hash: "913624534d668192",
                        status: 1,
                    },
                ]
            }
        });
    },
    'POST /api/v1/order/cancel/pending': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/blacklist/add': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                mri: 'ef2f34g',
                kind: "address",
                value: "上海",
                operator_name: "jian",
                trade_id: null,
                created: "2020-08-29 20:49:19",
                remark: "3g4Test",
                updated: "2020-08-29 20:49:19",
                pack_hash: "913624534d668192",
                status: 1,
            }
        });
    },
    'POST /api/v1/blacklist/disable': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/blacklist/enable': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'DELETE /api/v1/blacklist/delete': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/blacklist/upload': (req, res) => {
        return res.json({
            status: 1,
            message: null,
            data: {}
        });
    },
    'POST /api/v1/blacklist/templates/download': (req, res) => {
        return res.json({
            status: 1,
            message: null,
            data: {}
        });
    },
    'POST /api/v1/delivery/download_ship_brand_code': (req, res) => {
        return res.json({
            status: 1,
            message: null,
            data: {}
        });
    },
    'POST /api/v1/orders/search': (req, res) => {
        return res.json({
            "status": 1,
            "message": null,
            "code": null,
            "i18n": null,
            "error": {},
            "data": {
                "page": {
                    "total": 7,
                    "count": 1,
                    "page_num": 1,
                    "page_size": 20
                },
                list: [
                    {
                        "trade_id": "tr_M1130a0807s4C53263jC",
                        "merchant_order_no": "test1596802208",
                        "order_currency": "USD",
                        "order_amount": 722.76,
                        "settle_currency": "CNY",
                        "settle_amount": 5018.05,
                        "fees": -250.9,
                        "risk_fees": -2.08,
                        "refund_total": -34,
                        "refunded": 2,
                        "declined": 0,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a080736J9DF2C2RnVsj",
                        "payment_time": "2020-08-07 20:10:14",
                        "created_time": "2020-08-07 20:10:09",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTUoIiqtrXp1",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a080719E7J26g2G",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "cc_id": "cc_M1130a0807s1C2A8ehgD",
                            "phone": "64-914-927-1096",
                            "email": "Brandt_Moore@gmail.com",
                            "first_name": "Oda",
                            "last_name": "Swift",
                            "country": "MO",
                            "state": "Schmidttown",
                            "city": "New Jorgeville",
                            "address": "2961 Howard Squares",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Alva_Rosenbaum31@hotmail.com",
                            "shipping_first_name": "Jaqueline",
                            "shipping_last_name": "Borer",
                            "shipping_country": "SC",
                            "shipping_state": "Kentucky",
                            "shipping_city": "South Burley",
                            "shipping_address": "152 Skye Coves",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596802212000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s1C2A8ehgD",
                            "brand": "visa",
                            "email": "Brandt_Moore@gmail.com",
                            "name": "Oda Swift",
                            "phone_number": "64-914-927-1096",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "MO",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807s4C53263jC",
                            "status": 1,
                            "created": 1596802212000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a08072105519107",
                        "merchant_order_no": "test1596802223",
                        "order_currency": "USD",
                        "order_amount": 742.94,
                        "settle_currency": "CNY",
                        "settle_amount": 5158.15,
                        "fees": -257.9,
                        "risk_fees": -2.08,
                        "refund_total": -553,
                        "refunded": 2,
                        "declined": 0,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a080714e5ee073AZMc7",
                        "payment_time": "2020-08-07 20:10:25",
                        "created_time": "2020-08-07 20:10:22",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTBA6sVMynMW",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a080711D8b8013D",
                            "trade_id": "tr_M1130a08072105519107",
                            "cc_id": "cc_M1130a08076560B39E8c",
                            "phone": "1-425-165-1317",
                            "email": "Winnifred70@hotmail.com",
                            "first_name": "Erna",
                            "last_name": "Sauer",
                            "country": "TC",
                            "state": "Hoegerchester",
                            "city": "West Jakobmouth",
                            "address": "8589 Kaylin Groves",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Orland.Stokes@gmail.com",
                            "shipping_first_name": "Malvina",
                            "shipping_last_name": "Dach",
                            "shipping_country": "SV",
                            "shipping_state": "Kentucky",
                            "shipping_city": "Martinaview",
                            "shipping_address": "732 Deonte Throughway",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596802224000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a08076560B39E8c",
                            "brand": "visa",
                            "email": "Winnifred70@hotmail.com",
                            "name": "Erna Sauer",
                            "phone_number": "1-425-165-1317",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "TC",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a08072105519107",
                            "status": 1,
                            "created": 1596802224000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a0807s506B65567",
                        "merchant_order_no": "test1596802228",
                        "order_currency": "USD",
                        "order_amount": 85.2,
                        "settle_currency": "CNY",
                        "settle_amount": 591.53,
                        "fees": -29.57,
                        "risk_fees": -2.08,
                        "refund_total": 0,
                        "refunded": 0,
                        "declined": 1,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a0807s12144GEk4yPTV",
                        "payment_time": "2020-08-07 20:10:31",
                        "created_time": "2020-08-07 20:10:28",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTY6LPBCzQ24",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a0807167K3AJ64a",
                            "trade_id": "tr_M1130a0807s506B65567",
                            "cc_id": "cc_M1130a0807s1BEd616e7",
                            "phone": "26-006-003-5705",
                            "email": "Lyla_Wunsch@hotmail.com",
                            "first_name": "Valentine",
                            "last_name": "Anderson",
                            "country": "LS",
                            "state": "East Virginia",
                            "city": "Tressieton",
                            "address": "914 Kaylah Islands",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Giles75@yahoo.com",
                            "shipping_first_name": "Caleb",
                            "shipping_last_name": "Ritchie",
                            "shipping_country": "GF",
                            "shipping_state": "Kentucky",
                            "shipping_city": "Brownburgh",
                            "shipping_address": "878 Celia Mountain",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596802230000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s1BEd616e7",
                            "brand": "visa",
                            "email": "Lyla_Wunsch@hotmail.com",
                            "name": "Valentine Anderson",
                            "phone_number": "26-006-003-5705",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "LS",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807s506B65567",
                            "status": 1,
                            "created": 1596802230000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a0807177g691Cb4",
                        "merchant_order_no": "test1596802234",
                        "order_currency": "USD",
                        "order_amount": 662.34,
                        "settle_currency": "CNY",
                        "settle_amount": 4598.56,
                        "fees": -229.92,
                        "risk_fees": -2.08,
                        "refund_total": 0,
                        "refunded": 0,
                        "declined": 1,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a0807328951E5bZDIBI",
                        "payment_time": "2020-08-07 20:10:37",
                        "created_time": "2020-08-07 20:10:33",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTbVp5GdArT7",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a080796J9041B4z",
                            "trade_id": "tr_M1130a0807177g691Cb4",
                            "cc_id": "cc_M1130a0807s738DDkaB8",
                            "phone": "61-825-947-1402",
                            "email": "Ursula_Lesch32@gmail.com",
                            "first_name": "Ibrahim",
                            "last_name": "Hettinger",
                            "country": "TM",
                            "state": "Bradtkeburgh",
                            "city": "East Maryam",
                            "address": "1113 Sanford Key",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Jalyn85@yahoo.com",
                            "shipping_first_name": "Albertha",
                            "shipping_last_name": "Rice",
                            "shipping_country": "BO",
                            "shipping_state": "Kentucky",
                            "shipping_city": "South Anika",
                            "shipping_address": "70135 Muriel Square",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596802234000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s738DDkaB8",
                            "brand": "DClub",
                            "email": "Ursula_Lesch32@gmail.com",
                            "name": "Ibrahim Hettinger",
                            "phone_number": "61-825-947-1402",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "TM",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807177g691Cb4",
                            "status": 1,
                            "created": 1596802234000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a0807s1KBjb5chB",
                        "merchant_order_no": "test1596806908",
                        "order_currency": "USD",
                        "order_amount": 971.98,
                        "settle_currency": "CNY",
                        "settle_amount": 6748.35,
                        "fees": -337.41,
                        "risk_fees": -2.08,
                        "refund_total": 0,
                        "refunded": 0,
                        "declined": 0,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a0807189Ch3jbBAawWO",
                        "payment_time": "2020-08-07 21:28:37",
                        "created_time": "2020-08-07 21:28:29",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTx6GhQat7R2",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a0807s142d43G65",
                            "trade_id": "tr_M1130a0807s1KBjb5chB",
                            "cc_id": "cc_M1130a0807s20KeFaF5G",
                            "phone": "72-404-517-2483",
                            "email": "Hardy22@gmail.com",
                            "first_name": "Hilda",
                            "last_name": "McKenzie",
                            "country": "SC",
                            "state": "Lakinside",
                            "city": "Lednerview",
                            "address": "838 Larkin Crossroad",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Rossie.Skiles@hotmail.com",
                            "shipping_first_name": "Morton",
                            "shipping_last_name": "Stehr",
                            "shipping_country": "TR",
                            "shipping_state": "Kentucky",
                            "shipping_city": "Port Lelia",
                            "shipping_address": "28094 Loraine Cape",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596806913000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s20KeFaF5G",
                            "brand": "mastercard",
                            "email": "Hardy22@gmail.com",
                            "name": "Hilda McKenzie",
                            "phone_number": "72-404-517-2483",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "SC",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807s1KBjb5chB",
                            "status": 1,
                            "created": 1596806913000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a0807s25H9dC7G4",
                        "merchant_order_no": "test1596806924",
                        "order_currency": "USD",
                        "order_amount": 885.23,
                        "settle_currency": "CNY",
                        "settle_amount": 6146.06,
                        "fees": -307.3,
                        "risk_fees": -2.08,
                        "refund_total": 0,
                        "refunded": 0,
                        "declined": 0,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a0807s5k2eB4265un20",
                        "payment_time": "2020-08-07 21:28:54",
                        "created_time": "2020-08-07 21:28:43",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 1,
                        "track_number": "TESTXz7TlOFYxu",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a0807s8A6d4K0jB",
                            "trade_id": "tr_M1130a0807s25H9dC7G4",
                            "cc_id": "cc_M1130a0807s21EdA1G0d",
                            "phone": "53-825-277-2551",
                            "email": "Brendan57@gmail.com",
                            "first_name": "Magnolia",
                            "last_name": "Grimes",
                            "country": "CR",
                            "state": "Port Ritashire",
                            "city": "Aronstad",
                            "address": "1152 Laury Knoll",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Deondre.Kris@yahoo.com",
                            "shipping_first_name": "Paxton",
                            "shipping_last_name": "Durgan",
                            "shipping_country": "MF",
                            "shipping_state": "Kentucky",
                            "shipping_city": "Felipechester",
                            "shipping_address": "4385 Skiles Brooks",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596806932000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s21EdA1G0d",
                            "brand": "ae",
                            "email": "Brendan57@gmail.com",
                            "name": "Magnolia Grimes",
                            "phone_number": "53-825-277-2551",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "CR",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807s25H9dC7G4",
                            "status": 1,
                            "created": 1596806932000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    },
                    {
                        "trade_id": "tr_M1130a0807s15hf1KCeb",
                        "merchant_order_no": "test1596807124",
                        "order_currency": "USD",
                        "order_amount": 475.42,
                        "settle_currency": "CNY",
                        "settle_amount": 3300.79,
                        "fees": -165.03,
                        "risk_fees": -2.08,
                        "refund_total": 0,
                        "refunded": 0,
                        "declined": 0,
                        "settled": 0,
                        "deposit_settled": 0,
                        "payment_id": "py_M1130a0807s1gdG0b4j8aW00",
                        "payment_time": "2020-08-07 21:32:07",
                        "created_time": "2020-08-07 21:32:04",
                        "pay_status": "paid",
                        "reason": null,
                        "site_url": "www.iioffer.vip",
                        "ip": "58.24.127.131",
                        "products": null,
                        "delivery_status": 2,
                        "track_number": "TEST52L9zEV0o8",
                        "track_brand": "dhl",
                        "meta_data": null,
                        "customer": {
                            "cch_id": "cch_M1130a0807s543FJ1218",
                            "trade_id": "tr_M1130a0807s15hf1KCeb",
                            "cc_id": "cc_M1130a0807s2e4JkbE8d",
                            "phone": "44-415-162-3517",
                            "email": "Lessie58@yahoo.com",
                            "first_name": "Derrick",
                            "last_name": "Tromp",
                            "country": "IO",
                            "state": "Lake Preston",
                            "city": "Port Eribertomouth",
                            "address": "37828 Santos Brooks",
                            "zip_code": "40511",
                            "shipping_phone": "13323904176",
                            "shipping_email": "Martina_Barrows36@hotmail.com",
                            "shipping_first_name": "Samson",
                            "shipping_last_name": "Schoen",
                            "shipping_country": "CK",
                            "shipping_state": "Kentucky",
                            "shipping_city": "Lilianamouth",
                            "shipping_address": "29032 Barrows Knolls",
                            "shipping_zip_code": "40511",
                            "device_id": null,
                            "ip": "58.24.127.131",
                            "ip_country": "CN",
                            "status": 1,
                            "created": 1596807125000,
                            "captured": null,
                            "remark": null
                        },
                        "card": {
                            "cc_id": "cc_M1130a0807s2e4JkbE8d",
                            "brand": "jcb",
                            "email": "Lessie58@yahoo.com",
                            "name": "Derrick Tromp",
                            "phone_number": "44-415-162-3517",
                            "currency": "USD",
                            "card64": "424242***4242",
                            "country_iso2": "IO",
                            "last4": "4242",
                            "bin": "424242",
                            "ip": "58.24.127.131",
                            "trade_id": "tr_M1130a0807s15hf1KCeb",
                            "status": 1,
                            "created": 1596807125000,
                            "cvc_check": null,
                            "fingerprint": "f0675a9bd94dc476"
                        }
                    }
                ]
            },
            "request_id": "req_UKvviBFHTC"
        });
    },
    'POST /api/v1/orders/search/v2': (req, res) => {
        return res.json({
            "status": 1,
            "message": null,
            "code": null,
            "i18n": null,
            "error": {},
            "data": {
                "page": {
                    "total": 7,
                    "count": 1,
                    "page_num": 1,
                    "page_size": 20
                },
                list: [
                    {
                        "trade_id": "tr_test701220628s97Kj6884J",
                        "merchant_order_no": "7012220210628125421",
                        "last4": "3155",
                        "email": "xxxyyy@gmail.com",
                        "order_amount": 856325,
                        "order_currency": "VND",
                        "settle_amount": 36.82,
                        "settle_currency": "USD",
                        "card_brand": "visa",
                        "pay_status": "paid",
                        "declined": 0,
                        "site_url": "www.demo.com",
                        "ip": "172.17.0.1",
                        "created_time": 1624856061000,
                        "payment_time": 1624856099000,
                        "wtp3d": null,
                        "order_reason": null,
                        "refunded": 0,
                        "fail_message": null
                    }
                ]
            },
            "request_id": "req_UKvviBFHTC"
        });
    },
    'POST /api/v1/delivery/upload': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    //---
    'POST /api/v1/ticket/create': (req, res) => {
        return res.json({
            status: 1,
            message: '工单生成成功',
            data: {ticket_id: 'tk-888888888'}
        });
    },
    'POST /api/v1/ticket/search': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: [
                    {
                        tk_id: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        question_value: "ORDER",
                        ticket_value: 'PENDING',
                        priority: 0,
                        created: "2020-09-01 10:00:00",
                        updated: "2020-08-29 20:49:19",
                    },
                    {
                        tk_id: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        question_value: "ORDER",
                        ticket_value: 'PENDING',
                        priority: 0,
                        created: "2020-09-01 10:00:00",
                        updated: "2020-08-29 20:49:19",
                    }, {
                        tk_id: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        question_value: "ORDER",
                        ticket_value: 'PENDING',
                        priority: 0,
                        created: "2020-09-01 10:00:00",
                        updated: "2020-08-29 20:49:19",
                    }, {
                        tk_id: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        question_value: "ORDER",
                        ticket_value: 'PENDING',
                        priority: 0,
                        created: "2020-09-01 10:00:00",
                        updated: "2020-08-29 20:49:19",
                    }, {
                        tk_id: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        question_value: "ORDER",
                        ticket_value: 'PENDING',
                        priority: 0,
                        created: "2020-09-01 10:00:00",
                        updated: "2020-08-29 20:49:19",
                    },
                ]
            }
        });
    },
    'POST /api/v1/ticket/reply': (req, res) => {
        return res.json({
            status: 1,
            message: '信息回复成功',
            data: {}
        });
    },
    'POST /api/v1/ticket/close': (req, res) => {
        return res.json({
            status: 1,
            message: '工单已关闭',
            data: {}
        });
    },
    'GET /api/v1/ticket/detail/:id': (req, res) => {
        return res.json({
            status: 1,
            message: '',
            data: {
                list: [
                    {
                        content: "一条无关紧要的测试数据",
                        attach: '/ticket/M70252/gLMFSw09241618.png',
                        ticket_attach_url: "/api/ticket/attach?name=/ticket/M70252/gLMFSw09241618.png",
                        created: 1600854270000,
                        current_dist: "2天前",
                        user_name: "admin",
                        operator: "admin",
                        is_system: 1,
                    }],
                info: {
                    attach: null,
                    case_type: 3,
                    content: "sadfsdaf",
                    created: 1600854270000,
                    email: "sadfsda@qq.com",
                    mer_name: "测试6699",
                    mer_no: "M70252",
                    operator: "admin",
                    phone: "1663770785082",
                    priority: 1,
                    question_case: "对接接口",
                    question_value: null,
                    status: 1,
                    ticket_status: "待处理",
                    ticket_value: null,
                    title: "sadfsda",
                    tk_id: "tk_1gcQDBBBspEV",
                    updated: null
                }
            }
        })
    },
    //--
    'GET /api/v1/report/last24Hours': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                "list": [
                    "",
                    "",
                    "234",
                    "",
                    "233",
                    "",
                    "",
                    "",
                    "31",
                    "",
                    "321",
                    "",
                    "132",
                    "",
                    "534",
                    "346",
                    "",
                    "",
                    "456",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                "labels": [
                    "2020-09-07:13",
                    "2020-09-07:12",
                    "2020-09-07:11",
                    "2020-09-07:10",
                    "2020-09-07:09",
                    "2020-09-07:08",
                    "2020-09-07:07",
                    "2020-09-07:06",
                    "2020-09-07:05",
                    "2020-09-07:04",
                    "2020-09-07:03",
                    "2020-09-07:02",
                    "2020-09-07:01",
                    "2020-09-07:00",
                    "2020-09-06:23",
                    "2020-09-06:22",
                    "2020-09-06:21",
                    "2020-09-06:20",
                    "2020-09-06:19",
                    "2020-09-06:18",
                    "2020-09-06:17",
                    "2020-09-06:16",
                    "2020-09-06:15",
                    "2020-09-06:14"
                ]
            }
        })
    },
    'GET /api/v1/report/last30Days': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                "list": [
                    "",
                    "234",
                    "",
                    "",
                    "",
                    "234.45",
                    "",
                    "",
                    "",
                    "678",
                    "",
                    "",
                    "453",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                "labels": [
                    "2020-09-07",
                    "2020-09-06",
                    "2020-09-05",
                    "2020-09-04",
                    "2020-09-03",
                    "2020-09-02",
                    "2020-09-01",
                    "2020-08-31",
                    "2020-08-30",
                    "2020-08-29",
                    "2020-08-28",
                    "2020-08-27",
                    "2020-08-26",
                    "2020-08-25",
                    "2020-08-24",
                    "2020-08-23",
                    "2020-08-22",
                    "2020-08-21",
                    "2020-08-20",
                    "2020-08-19",
                    "2020-08-18",
                    "2020-08-17",
                    "2020-08-16",
                    "2020-08-15",
                    "2020-08-14",
                    "2020-08-13",
                    "2020-08-12",
                    "2020-08-11",
                    "2020-08-10",
                    "2020-08-09"
                ]
            }
        })
    },
    'GET /api/v1/report/last90Days': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                "list": [
                    "",
                    "784",
                    "",
                    "",
                    "",
                    "235",
                    "",
                    "",
                    "",
                    "48",
                    "",
                    "",
                    "453",
                    "",
                    "",
                    "34",
                    "",
                    "57.23",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "3.34",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ],
                "labels": [
                    "2020-09-07",
                    "2020-09-06",
                    "2020-09-05",
                    "2020-09-04",
                    "2020-09-03",
                    "2020-09-02",
                    "2020-09-01",
                    "2020-08-31",
                    "2020-08-30",
                    "2020-08-29",
                    "2020-08-28",
                    "2020-08-27",
                    "2020-08-26",
                    "2020-08-25",
                    "2020-08-24",
                    "2020-08-23",
                    "2020-08-22",
                    "2020-08-21",
                    "2020-08-20",
                    "2020-08-19",
                    "2020-08-18",
                    "2020-08-17",
                    "2020-08-16",
                    "2020-08-15",
                    "2020-08-14",
                    "2020-08-13",
                    "2020-08-12",
                    "2020-08-11",
                    "2020-08-10",
                    "2020-08-09"
                ]
            }
        })
    },
    'GET /api/v1/announce/last': (req, res) => {
        return res.json({
            status: 1,
            data: {
                list: [
                    {nid: 'n2f3f4', time: '2020-01-01', title: '2020年6月服务费发票寄送服务费发票寄送', content: 'dxx'},
                    {nid: 'n8934g', time: '2020-01-01', title: '2020年6月服务费发票寄送服务费发票寄送', content: 'dxx'},
                    {nid: 'n456ee2g', time: '2020-01-01', title: '2020年6月服务费发票寄送服务费发票寄送', content: 'dxx'},
                    {nid: 'n5534g', time: '2020-01-01', title: '2020年6月服务费发票寄送服务费发票寄送', content: 'dxx'},
                    {nid: 'n856ee2g', time: '2020-01-01', title: '2020年6月服务费发票寄送服务费发票寄送', content: 'dxx'},
                ]
            }
        })
    },
    'POST /api/v1/merchant/balances': (req, res) => {
        return res.json({
            status: 1,
            data: {
                list: [
                    {currency: 'CNY', balance: 34535.54 + new Date().getMilliseconds()},
                ]
            }
        })
    },
    'POST /api/v1/notice/search': (req, res) => {
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
                        nid: 'n2f3f4',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 1,
                    },
                    {
                        nid: 'n8934g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                    {
                        nid: 'n456ee2g',
                        type: 'announce',
                        kind: 'announce',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 1,
                    },
                    {
                        nid: 'n5534g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                    {
                        nid: 'n856ee2g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                ]
            }
        })
    },
    'GET /api/v1/notice/detail/:id': (req, res) => {
        return res.json({
            status: 1,
            data: {
                nid: 'n2f3f4',
                type: 'notify',
                kind: 'chargeback',
                created: '2020-01-01',
                title: '2020年6月服务费发票寄送服务费发票寄送',
                message: 'dxx <h3>务费发票寄送服务费发票寄送</h3>',
                target_id: 'tr_wjfl23jfl2',
                params: '',
            },
        })
    },
    'POST /api/v1/notice/mark/all/read': (req, res) => {
        return res.json({
            status: 1,
            data: {},
        })
    },
    'GET /api/v1/notice/un_read/last5': (req, res) => {
        return res.json({
            status: 1,
            data: {
                notice_count: 9,
                list: [
                    {
                        nid: 'n2f3f4',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 1,
                    },
                    {
                        nid: 'n8934g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                    {
                        nid: 'n456ee2g',
                        type: 'announce',
                        kind: 'announce',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 1,
                    },
                    {
                        nid: 'n5534g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                    {
                        nid: 'n856ee2g',
                        type: 'notify',
                        kind: 'chargeback',
                        created: '2020-01-01',
                        title: '2020年6月服务费发票寄送服务费发票寄送',
                        message: 'dxx',
                        has_read: 0,
                    },
                ]
            },
        })
    },
    'POST /api/v1/notice/mark/read': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    //--
    //download, /decline/download, /finance/download, /settle/download, /delivery/download
    'POST /api/v1/decline/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/finance/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/settle/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/settle/detail/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/delivery/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/delivery/is_settle_day': (req, res) => {
        return res.json({
            status: 1,
            data: {
                is_settle_day: false
            }
        })
    },
    'POST /api/v1/orders/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/refund/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/search': (req, res) => {
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
                        site_id: 'wfljw342f2',
                        site_url: 'www.google.com',
                        return_url: 'http://www.gooogle.com/payment/paymentRetReturn.php',
                        site_system: 'Opencart',
                        created: '2020-01-01',
                        status: 3,
                        review_reason: '网站并非实物',
                        updated: '',
                        is_virtual: 0,
                        operator_name: '张三',
                        is_restricted: 1,
                        mer_remark: '用户名：aaa 密码：aaa',
                    },
                    {
                        site_id: 'wfljw342f2',
                        site_url: 'www.google1.com',
                        return_url: 'http://www.gooogle1.com/payment/paymentRetReturn.php',
                        site_system: 'Opencart',
                        created: '2020-01-01',
                        status: 2,
                        review_reason: '',
                        updated: '',
                        is_virtual: 0,
                        url_protocol: 'https',
                        operator_name: '张三',
                        is_restricted: 0,
                        mer_remark: '',
                    },
                    {
                        site_id: 'wfljw342f2',
                        site_url: 'www.google2.com',
                        return_url: 'http://www.gooogle13.com/payment/paymentRetReturn.php',
                        site_system: 'Shopify',
                        created: '2020-01-01',
                        status: 3,
                        review_reason: '',
                        updated: '',
                        is_virtual: 1,
                        url_protocol: 'https',
                        operator_name: '张三',
                        is_restricted: 1,
                        mer_remark: '用户名：ccc 密码：ccc',
                    },
                ]
            }
        })
    },
    'POST /api/v1/shop/last50': (req, res) => {
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
                        site_id: 'wfljw342f2',
                        site_url: 'www.google.com',
                        return_url: 'http://www.gooogle.com/payment/paymentRetReturn.php',
                        site_system: 'Opencart',
                        created: '2020-01-01',
                        status: 3,
                        review_reason: '网站并非实物',
                        updated: '',
                        is_virtual: 0,
                        operator_name: '张三',
                    }
                ]
            }
        })
    },
    'GET /api/v1/shop/site_system_list': (req, res) => {
        return res.json({
            status: 1,
            data: {
                list: [
                    {value: 'PrestaShop', text: 'PrestaShop'},
                    {value: 'Shopify', text: 'Shopify'},
                    {value: 'WooCommerce', text: 'WooCommerce'},
                    {value: 'Opencart', text: 'Opencart'},
                    {value: 'Java', text: 'Java'},
                    {value: 'Php', text: 'Php'},
                    {value: 'Other', text: 'Other'},
                ]
            }
        })
    },
    'POST /api/v1/shop/add': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/update': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/update_web_site': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/role/search': (req, res) => {
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
                        role_uid: 'w454545',
                        role_name: '客服1',
                        "menus": [
                            {
                                "name": "finance_select",
                                "title": "portal.title.finance.select",
                                "sort": 11,
                                "icon": null,
                                "remark": null,
                                "status_txt": "启用"
                            },
                            {
                                "name": "finance_search",
                                "title": "title.finance_search",
                                "sort": 101,
                                "icon": null,
                                "remark": null,
                                "status_txt": "启用"
                            }
                        ],
                        remark: 'wf3jw342f2',
                        status: 1,
                        created: '2020-01-01',
                        updated: '2020-01-01',
                    },
                    {
                        role_uid: 'w454534545',
                        role_name: '客服3',
                        "menus": [
                            {
                                "name": "finance_select",
                                "title": "portal.title.finance.select",
                                "sort": 11,
                                "icon": null,
                                "remark": null,
                                "status_txt": "启用"
                            },
                            {
                                "name": "finance_search",
                                "title": "title.finance_search",
                                "sort": 101,
                                "icon": null,
                                "remark": null,
                                "status_txt": "启用"
                            }
                        ],
                        remark: 'wf3jw342f2',
                        status: 1,
                        created: '2020-01-01',
                        updated: '2020-01-01',
                    },
                ]
            }
        })
    },
    'POST /api/v1/merchant/user/search': (req, res) => {
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
                        mer_uid: 'w454545',
                        username: 'user11',
                        email: 'wef4jl@x.com',
                        phone: '21323',
                        full_name: '昵称2',
                        role_uid: 'w454534545',
                        role_name: '客服3',
                        status: 1,
                        email_status: 1,
                        created: '2020-01-01',
                    },
                ]
            }
        })
    },
    'GET /api/v1/merchant/menus': (req, res) => {
        return res.json(demoUserInfo());
    },
    'POST /api/v1/merchant/bank/add': (req, res) => {
        return res.json(demoUserInfo());
    },
    'GET /api/v1/merchant/info': (req, res) => {
        return res.json({
            status: 1,
            data: {
                info: {
                    chargeback_fees: 18,
                    created: "2020-08-07 23:53:09",
                    declined_num: 0,
                    email: "OzyeAgNpyB@test.com",
                    expire_date: null,
                    expire_date_fmt: "",
                    expire_date_pretty: "",
                    fixed_fees: 0.3,
                    fees_rate: '[{"card":"feesRateVisa","rate":0.05},{"card":"feesRateMaster","rate":0.06},{"card":"feesRateJcb","rate":0.06},{"card":"feesRateAe","rate":0.06},{"card":"feesRateDClub","rate":0}]',
                    identity_status: 0,
                    bank_status: 0,
                    identity_validated: false,
                    is_virtual: null,
                    last_monthly_ecm: 0,
                    max_ecm: null,
                    md5_key: "q)Ico[lGvEHz",
                    mer_no: "M70418",
                    monitor_ecm: 0,
                    name: null,
                    normal_payout_day: 0,
                    online: true,
                    online_date: "2020-08-07 23:53:26",
                    phone: "1663283804703",
                    settlement_cycle: "monthFourTimer",
                    status: 1,
                    total_declined_num: 0,
                    total_ecm: 0,
                    trade_limit: null,
                    updated: "2020-08-07 23:53:26",
                    virtual: false,
                    mid_type: '', //company
                    identity_account_type: 'personal',
                    identity_country_type: 'outland',
                    allow_personal: 0,
                    card_account_type: 'company',
                    card_country_type: 'inland',
                },
                bank: {
                    bank_brand: '工商银行',
                    bank_card_mobile: '1333323232',
                    bank_id: 'bank_23r23r',
                    bank_name: '',
                    bank_photo: null,
                    bank_swift_no: null,
                    card_account_name: '李四一',
                    card_no: '622988888888888888',
                    card_type: '1',
                    card_type_str: "个人",
                    created: 1597560824000,
                    disabled: false,
                    mer_no: '4008',
                    status: 3,
                    updated: null,
                },
                ecm_rule: [
                    {amount: 18, condition_ecm_l: null, condition_ecm_r: 0.01, condition_order_count: 3,},
                    {amount: 40, condition_ecm_l: 0.01, condition_ecm_r: 0.02, condition_order_count: 6,},
                    {amount: 100, condition_ecm_l: 0.02, condition_ecm_r: 0.03, condition_order_count: 9,},
                ],
            }
        })
    },
    'GET /api/v1/merchant/setup': (req, res) => {
        return res.json({
            status: 1,
            data: {
                notice: {
                    "pay_ok_to_customer": "1",
                    "pay_ok_to_merchant": "1",
                    "complain_notice_mer": "1",
                    "charge_back_notice_mer": "1",
                    "refunded_to_customer": "1"
                }
            }
        })
    },
    'GET /api/v1/merchant/identity': (req, res) => {
        return res.json({
            status: 1,
            data: {
                detail: {
                    "identity_reason": '图片不清楚',
                    "name": "测试26",
                    "identity_name": "zz",
                    "identity_photo_a": "wef",
                    "identity_photo_b": null,
                    "identity_photo_c": null,
                    "identity_bank_photo": null,
                    "identity_number": null,
                    "identity_start_date": null,
                    "identity_expire_date": null,
                    "qq": null,
                    "address": null,
                    "zip_code": null,
                    "shop_site": null,
                    "company_name": "zzCompany",
                    "company_identity_photo": null,
                    "company_identity_id": null,
                    "company_start_date": null,
                    "company_expire_date": null,
                    "company_scope": null,
                    "company_phone": null,
                    "company_state": null,
                    "company_city": null,
                    "company_address": null,
                    "product_info": null,
                    "me_nickname": null,
                    "profession": null,
                    "sex": null,
                    "identity_start_date_fmt": "",
                    "identity_expire_date_fmt": "",
                    "company_start_date_fmt": "",
                    "company_expire_date_fmt": "",
                    "identity_photo_b_url": "",
                    "identity_bank_photo_url": "",
                    "company_identity_photo_url": "",
                    "identity_photo_a_url": "/mer/id_img?name=wef",
                    "phone": "1333333",
                    "email": "",
                    "company_identity_photo": null,
                    "company_business_identity_photo": null,
                    "company_register_identity_photo": null,
                    "company_annual_report_photo": null,
                    "chairman_authorization": null,
                },
                "job_type": [
                    {
                        "text": "各类专业，技术人员",
                        "value": "1A"
                    },
                    {
                        "text": "国家机关，党群组织，企事业单位的负责人",
                        "value": "1B"
                    },
                    {
                        "text": "办事人员和有关人员",
                        "value": "1C"
                    },
                    {
                        "text": "商业工作人员",
                        "value": "1D"
                    },
                    {
                        "text": "服务性工作人员",
                        "value": "1E"
                    },
                    {
                        "text": "农林牧渔劳动者",
                        "value": "1F"
                    },
                    {
                        "text": "生产工作，运输工作和部分体力劳动者",
                        "value": "1G"
                    },
                    {
                        "text": "不便分类的其他劳动者",
                        "value": "1H"
                    }
                ],
                "business_type": [
                    {
                        "text": "农、林、牧、渔业",
                        "value": "A"
                    },
                    {
                        "text": "采矿业",
                        "value": "B"
                    },
                    {
                        "text": "制造业",
                        "value": "C"
                    },
                    {
                        "text": "电力、热力、燃气及水生产和供应业",
                        "value": "D"
                    },
                    {
                        "text": "建筑业",
                        "value": "E"
                    },
                    {
                        "text": "批发和零售业",
                        "value": "F"
                    },
                    {
                        "text": "交通运输、仓储和邮政业",
                        "value": "G"
                    },
                    {
                        "text": "住宿和餐饮业",
                        "value": "H"
                    },
                    {
                        "text": "信息传输、软件和信息技术服务业",
                        "value": "I"
                    },
                    {
                        "text": "金融业",
                        "value": "J"
                    },
                    {
                        "text": "房地产业",
                        "value": "K"
                    },
                    {
                        "text": "租赁和商务服务业",
                        "value": "L"
                    },
                    {
                        "text": "科学研究和技术服务业",
                        "value": "M"
                    },
                    {
                        "text": "水利、环境和公共设施管理业",
                        "value": "N"
                    },
                    {
                        "text": "居民服务、修理和其他服务业",
                        "value": "O"
                    },
                    {
                        "text": "教育",
                        "value": "P"
                    },
                    {
                        "text": "卫生和社会工作",
                        "value": "Q"
                    },
                    {
                        "text": "文化、体育和娱乐业",
                        "value": "R"
                    },
                    {
                        "text": "公共管理、社会保障和社会组织",
                        "value": "S"
                    },
                    {
                        "text": "国际组织",
                        "value": "T"
                    },
                    {
                        "text": "未知",
                        "value": "X"
                    }
                ],
            }
        })
    },
    'POST /api/v1/merchant/update/identity': (req, res) => {
        return res.json({
            status: 1,
            message: '',
            data: {},
        })
    },
    'POST /api/v1/dispute/search': (req, res) => {
        return res.json({
            status: 1,
            message: '',
            data: {
                page: { //后端方法 _pageSetRes(..)
                    count: 5,
                    page_num: req.body.page * 1 || 1,
                    page_size: 20,
                    total: 50,
                },
                list: [
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'underway',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'underway',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'underway',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'underway',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'complete',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'complete',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'complete',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                    {
                        dispute_no: 'dp_kol15122333',
                        merchant_order_no: '5200191919181838282',
                        trade_id: '7600100202334',
                        email: '1506266211@qq.com',
                        created: '2020-09-04 13:00:15',
                        updated: null,
                        dispute_status: 'complete',
                        remark: '略',
                        dispute_type: '货不对版'
                    },
                ]
            }
        })
    },
    'GET /api/v1/dispute/detail/:id': (req, res) => {
        return res.json({
            status: 1,
            message: '',
            data: {
                "list": [
                    {
                        "email": "1071233321@live.com",
                        "complaint_content": "Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！Test！",
                        "is_system": "0",
                        "created": "2021-03-18 09:49:05",
                        "operator": "fan",
                        "attach": "SVYeF103180949.xlsx",
                        "attach_info": {
                            "file_size": "9.89",
                            "file_name": "黑名单批量导入模板v1.0.xlsx",
                            "type": "excel",
                            "new_file_name": "SVYeF103180949.xlsx",
                            "suffix": "xlsx"
                        },
                        "exist_file": true,
                        "dispute_attach_url": "/api/dispute/attach?name=SVYeF103180949.xlsx"
                    }
                ],
                "info": {
                    "dispute_no": "dp_A3P8XIUTJ1Jj",
                    "merchant_order_no": "7007320201113152400",
                    "trade_id": "tr_test700731113s89K8360aF",
                    "email": "1071233321@live.com",
                    "remark": null,
                    "created": 1616032145000,
                    "updated": null,
                    "dispute_status": "untreated",
                    "dispute_type": "REFUND",
                    "dispute_execution_time": null,
                    "is_read": 1,
                    "created_fmt": "2021-03-18 09:49:05",
                    "updated_fmt": "",
                    "created_pretty": "7小时前",
                    "dispute_execution_time_fmt": ""
                }
            }
        })
    },
    "POST /api/v1/dispute/update": (req, res) => {
        return res.json({
            status: 1,
            message: '状态更新！',
            data: null
        })
    },
    "POST /api/v1/dispute/finish": (req, res) => {
        return res.json({
            status: 1,
            message: '争议已处理完成！',
            data: null
        })
    },

    //=-=-=
    'POST /api/v1/merchant/role/add': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/role/update': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/user/add': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/user/update': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/user/disable': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/merchant/user/enable': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/close': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/open': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/shop/resubmit': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/dispute/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/payout/download': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/ticket/attach': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/dispute/attach': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    },
    'POST /api/v1/user/login_history': (req, res) => {
        return res.json({
            status: 1,
            data: {}
        })
    }
}
let sleep = false;
// let sleep = true;// true 测试延迟响应
module.exports = sleep ? delay(proxy, 2000) : proxy;
//https://github.com/jaywcjlove/mocker-api
