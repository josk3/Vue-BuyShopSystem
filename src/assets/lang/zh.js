module.exports = {
    portal: {
        title: '商户后台',
    },
    comm: { //通用
        login: '登录',
        re_login: '重新登录',
        forget_pwd: '忘记密码?',
        not_a_account: '还没有账号?',
        register_now: '立即注册',
        register: '注册',
        logout: '退出登录',
        login_timeout: '登录超时',
        logout_ok: '退出成功',
        merchant_login: '商户登录',
        cancel: '取消',
        profile: '个人中心',
        faq: '帮助中心',
        about_company: '公司介绍',
        help_center: '帮助中心',
        contact_us: '联系我们',
        record_total: '总记录数',
        confirm: '确认',
        remark: '备注说明',
        email_or_phone: '手机号或邮箱',

        //
        submitted: '已提交',
        setup_next: '下一步',
        search: '搜索',
        reset: '重置',
        all: '所有',
        success: '成功',
        fail: '失败',
        refund_ing: '退款中',

        //
        trade_id: '流水号',
        batch_id: '批次号',
        merchant_order_no: '订单号',
        country_name: '国家',
        email: '邮箱',
        blacklist_type: '黑名单类型',
        blacklist_value: '黑名单值',
        order_amount: '订单金额',
        payment_time: '交易时间',
        currency: '币种',
        apply_time: '申请时间',
        status: '状态',
        refund_amount: '退款金额',
        settlement_amount: '结算金额',
    },
    nav: {
        home: '主页',
        dashboard: '主页',
        profile: '人个中心',
        active_account: '激活您的账户',
        trade_manage: '交易管理',
        order_detail: '订单详情',
        payout_select: '结算管理',
        payout_apply: '结算申请',
        payout_history: '申请历史',
        refund_select: '退款查询',
        account_manage: '账户管理',
        merchant_info: '商户信息',
        merchant_identity: '我的认证',
        merchant_setup: '商户配置',
        merchant_users: '操作员管理',
        merchant_shop: '网址绑定',
        finance_select: '财务中心',
        finance_search: '所有明细',
        settle_search: '结算明细',
        fast_pay: '快捷收款',
        delivery_manage: '物流管理',
        risk_manage: '风控管理',
        risk_area: '风险地区',
        blacklist: '黑名单',
        support_ticket: '技术支持',
        message_center: '消息中心',
        dispute_manage: '投诉订单',
        faq: '帮助中心',
        login: '登录',
        register: '注册',
        logout: '退出',
        forget_pwd: '找回密码',
        reset_pwd: '重置密码',
        active_email: '激活邮件',
        decline_manage: '拒付管理',
        ticket_detail: '工单详情',
        '404': '404',
        '401': '401',

    },
    user: { //跟用户相关
        username: '用户名',
        password: '密码',
        mer_no: '商户号',

    },
    valid: {
        bad: {
            username_or_password: '用户名或密码错误'
        },
        fail: {
            password_more_miss: '密码错误次数过多,请找回密码或联系管理员'
        }
    },
    error: {},
    tab: {},
    refund: {
        un_refund: '未退款',
        all_amount_refund: '全额退款',
        part_refund: '部分退款',
        apply_refund: '提交申请退款',
        cancel_refund: '取消退款申请',
        reject_refund: '退款申请撤回',
        wait_bank_receive: '待银行接收退款申请',
        bank_accept_refund: '银行处理退款中',
        bank_reject_refund: '银行驳回退款申请',
        bank_complete_refund: '银行已完成退款',
    },
    login: {
        resolver_password: '找回密码',
        forget_info_will_send: '信息将发送到您的邮箱或手机',
        resolver_email_send: ['重置邮件已发送', '发送成功, 您现在可以进入邮箱重置密码了'],
        resolver_email_fail: ['没有收到?', '再次发送', '请查看垃圾箱内是否有邮件, 或再次发送'],
        reset_new_pwd: '设置新密码',
        new_password: '新密码',
        confirm_new_password: '确认新密码',
        register_right_now: '立即创建您的账号',
    },
    status: {
        normal: '正常',
        disable: '已禁用',
        yes: '是',
        no: '否',
        un_declined: '未拒付',
        has_declined: '已拒付',
        paid: '成功',
        pending: '待处理',
        failed: '失败',
        canceled: '取消',
        un_settled: '未结',
        has_settled: '已结算',
        payout_release: '已生成划款表',
        payout_paid: '已划款',
    },
    kind: {
        settle: '结算',
        deposit_settle: '保证金结算',
        sale: '收款',
        refund: '退款',
        trade: '交易结算',
        deposit: '保证金结算',
    },
    risk: {
        fingerprint: '卡指纹',
        email: '邮箱',
        ip: 'Ip',
        address: '地址',
        full_name: '姓名全名',
        phone: '电话',
        card_no: '卡号',
    },
    timeline: {
        order_canceled: 'Order cancel',
        created_order: 'Create order',
        start_payment: 'Begin process payment',
        payment_failed: 'Order payment failed',
        payment_pending: 'Order payment pending',
        payment_paid: 'Order payment success',
        payment_canceled: 'Order payment cancelled',
        smart_router: 'Smart channel router',
        sys_remark: 'Sys add remark',
        merchant_remark: 'Merchant add remark',
        sys_label: 'Sys add label',
        mark_risk: 'Mark risk order',
        shipment_info: 'Shipment Info',
        refund: 'Refund',
        settle: 'Settlement',
        chargeback: 'Chargeback',
    },
    payout: {
        delivery_reject: '问题单',
    },
    home: {},
    profile: {},
    ticket: {
        other: '其他',
        order: '订单问题',
        interface: '对接接口',
        settlement: '财务结算',
        pending: '待处理',
        wait_replay: '待回复',
        replied: '已回复',
        terminate: '处理结束',
        urgent: '紧急',
        plain: '一般',
    }
}
