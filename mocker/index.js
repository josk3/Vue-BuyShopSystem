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
                notice_count: 12,
                popup: null,
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
                    "name": "decline_manage",
                    "path": "/decline/manage",
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
                    "children": [
                        {
                            "name": "finance_search",
                            "path": "/finance/search",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "settle_search",
                            "path": "/settle/search",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                    ],
                    "have_show_child": true
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
                    "children": [
                        {
                            "name": "risk_area",
                            "path": "/risk/area",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "blacklist",
                            "path": "/risk/blacklist",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                    ],
                    "have_show_child": true
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
                    "children": [
                        {
                            "name": "merchant_info",
                            "path": "/merchant/info",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "merchant_identity",
                            "path": "/merchant/identity",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "merchant_setup",
                            "path": "/merchant/setup",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "merchant_users",
                            "path": "/merchant/users",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                        {
                            "name": "merchant_shop",
                            "path": "/merchant/shop",
                            "meta": null,
                            "children": null,
                            "have_show_child": false
                        },
                    ],
                    "have_show_child": true
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
    ];
}

function demoFinanceList(req) {
    return [
        {
            trade_id: 'tr_M112d20820s11e1' + req.body.finance_status,
            batch_id: 'b23ou82f2' + new Date().getMilliseconds(),
            merchant_order_no: 'wef2fv23433d' + new Date().getMilliseconds(),
            kind: 'sale',
            currency: 'USD',
            fees: 0.34,
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
        const {password, username} = req.body;
        if (password === 'Test123456' && username === 'admin') {
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
        u.data.user.notice_count = 0
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
                list: demoOrderList(req),
            }
        });
    },
    'POST /api/v1/refund/apply': (req, res) => {
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
                list: demoOrderList(req),
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
    'POST /api/v1/delivery/add': (req, res) => {
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
            data: {
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
                "settled": 1,
                "deposit_settled": 0,
                "payment_id": "py_M1130a080736J9DF2C2RnVsj",
                "payment_time": "2020-08-07 20:10:14",
                "created_time": "2020-08-07 20:10:09",
                "pay_status": "paid",
                "reason": null,
                "site_url": "www.iioffer.vip",
                "ip": "58.24.127.131",
                "products": [
                    {sku: 'f23f2', name: 'iPhone 12 Pro Max', price: 688.99, count: 2, currency: 'USD'},
                    {sku: 'gerg', name: 'iPhone 12 Pro Max', price: 688.99, count: 2, currency: 'USD'},
                    {sku: 'gtt', name: 'iPhone 12 Pro Max', price: 688.99, count: 2, currency: 'USD'},
                ],
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
            }
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
                        bli: 'ef2f34g',
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
                        bli: '9384g3gf4',
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
    'POST /api/v1/blacklist/add': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                bli: 'ef2f34g',
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
    'POST /api/v1/delivery/upload': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {}
        });
    },
    'POST /api/v1/ticket/create': (req, res) => {
        return res.json({
            status: 1,
            message: '工单生成成功',
            data: {ticket_id: 'tk-888a888s888'}
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
                        ticket_no: 'tk-888a888s888',
                        title: "活法",
                        email: "12512123123@1qq.com",
                        case_question: "ORDER",
                        ticket_status: 'PENDING',
                        priority: "0",
                        create_time: "2020-09-01 10:00:00",
                        update_time: "2020-08-29 20:49:19",
                    },
                    {
                        ticket_no: 'tk-666a666s665',
                        title: "结算周期",
                        email: "1507827723123@1qq.com",
                        case_question: "INTERFACE",
                        ticket_status: 'PENDING',
                        priority: "1",
                        create_time: "2020-09-01 10:00:00",
                        update_time: "2020-08-29 20:49:19",
                    },
                    {
                        ticket_no: 'tk-444s44444444',
                        title: "测试咨询问题1",
                        email: "1507827723123@1qq.com",
                        case_question: "INTERFACE",
                        ticket_status: 'PENDING',
                        priority: "1",
                        create_time: "2020-09-01 10:00:00",
                        update_time: "2020-08-29 20:49:19",
                    },
                    {
                        ticket_no: 'tk-23314111111',
                        title: "测试咨询问题2",
                        email: "1507827723123@1qq.com",
                        case_question: "INTERFACE",
                        ticket_status: 'PENDING',
                        priority: "1",
                        create_time: "2020-09-01 10:00:00",
                        update_time: "2020-08-29 20:49:19",
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
    'GET /api/v1/ticket/detailInfo': (req, res) => {
        return res.json({
            status: 1,
            message: '测试test',
            data: {
                list: [
                    {
                        content: '在吗',
                        attach: null,
                        create_time: "2020-09-01 10:00:00",
                        current_dist: "前一天",
                        user_name: '商户coco',
                        operator: null,
                        is_system: 1
                    },
                    {
                        content: '您好',
                        attach: null,
                        create_time: "2020-09-01 10:00:00",
                        current_dist: "前一天",
                        user_name: null,
                        operator: "管理小孙",
                        is_system: 0
                    },
                    {
                        content: '交易网站新加上去的审核要多久呀',
                        attach: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
                        create_time: "2020-09-01 10:00:00",
                        current_dist: "前一天",
                        user_name: '商户coco',
                        operator: null,
                        is_system: 1
                    },
                    {
                        content: '是新提交上去的是吗',
                        attach: null,
                        create_time: "2020-09-01 10:00:00",
                        current_dist: "前一天",
                        user_name: null,
                        operator: "管理小孙",
                        is_system: 0
                    },
                    {
                        content: '新提交上去的已经审核通过了',
                        attach: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
                        create_time: "2020-09-01 10:00:00",
                        current_dist: "前一天",
                        user_name: null,
                        operator: "管理小孙",
                        is_system: 0
                    },
                    {
                        content: '这边您可以下单测试一下，确保正常',
                        attach: null,
                        create_time: "2020-09-01 10:00:00",
                    }]
            }
        })
    },
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
            data:{}
        })
    },

}
let sleep = false;
// let sleep = true;// true 测试延迟响应
module.exports = sleep ? delay(proxy, 2000) : proxy;
//https://github.com/jaywcjlove/mocker-api
