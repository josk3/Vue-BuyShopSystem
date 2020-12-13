// import parseTime, formatTime and set to filter
import {isEmpty, isNumber} from "@/utils/validate";
import i18n from "@/service/i18n";
import {parseTime} from "@/utils";

export {parseTime, formatTime} from '@/utils'

/**
 * 空值显示 --
 */
export function nullToLine(val) {
    return isEmpty(val) ? '--' : val
}

/**
 * 金额显示 +/-
 */
export function chargeAmount(val) {
    return isEmpty(val) ? '--' : (val > 0) ? '+' + val : val;
}

/**
 * 值 0,1 状态 -》解析成文字
 */
export function yesOrNo(status) {
    if (isEmpty(status)) return ''
    switch (status) {
        case 0:
            return i18n.t('status.no')
        case 1:
            return i18n.t('status.yes')
    }
}

/**
 * 值 0,1 状态 -》解析成文字
 */
export function numberStatus(status) {
    if (isEmpty(status)) return ''
    switch (status) {
        case 0:
            return i18n.t('status.disabled')
        case 1:
            return i18n.t('status.normal')
    }
}

/**
 * 值 0,1 认证状态 -》解析成文字
 */
export function identityStatus(status) {
    if (isEmpty(status)) return ''
    switch (status) {
        case 0:
            return i18n.t('status.invalid')
        case 1:
            return i18n.t('status.valid')
        case 2:
            return i18n.t('status.wait_review')
        case 3:
            return i18n.t('status.review_reject')
    }
}

/**
 * 值 0,1 认证状态 -》解析成文字
 */
export function validStatus(status) {
    if (isEmpty(status)) return ''
    switch (status) {
        case 0:
            return i18n.t('status.invalid')
        case 1:
            return i18n.t('status.valid')
    }
}

/**
 * 状态数值-》解析成文字
 */
export function refundStatus(isRefund) {
    if (isEmpty(isRefund)) return ''
    switch (isRefund) {
        case 0:
        case 'normal':
            return i18n.t('refund.un_refund')
        case 1:
        case 'allAmountRefund':
            return i18n.t('refund.all_amount_refund')
        case 2:
        case 'partRefund':
            return i18n.t('refund.part_refund')
        case 13:
        case 'applyRefund':
            return i18n.t('refund.apply_refund')
        case 14:
        case 'cancelRefund':
            return i18n.t('refund.cancel_refund')
        case 15:
        case 'rejectRefund':
            return i18n.t('refund.reject_refund')
        case 16:
        case 'waitBankReceive':
            return i18n.t('refund.wait_bank_receive')
        case 17:
        case 'bankAcceptRefund':
            return i18n.t('refund.bank_accept_refund')
        case 18:
        case 'bankRejectRefund':
            return i18n.t('refund.bank_reject_refund')
        case 19:
        case 'bankCompleteRefund':
            return i18n.t('refund.bank_complete_refund')
    }
}

/**
 * 拒付状态数值-》解析成文字
 */
export function declinedStatus(isDeclined) {
    if (isEmpty(isDeclined)) return ''
    switch (isDeclined) {
        case 0:
            return i18n.t('status.un_declined')
        case 1:
            return i18n.t('status.has_declined')
    }
}

/**
 * 拒付类型-》解析成文字
 */
export function declineType(type) {
    if (isEmpty(type)) return ''
    switch (type) {
        case 'customerService':
            return i18n.t('decline.customer_service')
        case 'fraud':
            return i18n.t('decline.fraud')
    }
}

/**
 * 结算 状态数值-》解析成文字
 */
export function settleStatus(isSettled) {
    if (isEmpty(isSettled)) return ''
    switch (isSettled) {
        case 0:
            return i18n.t('status.un_settled')
        case 1:
            return i18n.t('status.has_settled')
    }
}

/**
 * 资金变动-类别 -》解析成文字
 */
export function chargeKind(kind) {
    if (isEmpty(kind)) return ''
    switch (kind) {
        case 'deposit_settle':
            return i18n.t('kind.deposit_settle')
        default:
            return i18n.t('kind.' + kind)
    }
}

/**
 * 结算提现状态 -》解析成文字
 */
export function payoutStatus(status) {
    if (isEmpty(status)) return ''
    switch (status) {
        case 'release':
            return i18n.t('status.payout_release')
        case 'paid':
            return i18n.t('status.payout_paid')
    }
}

/**
 * 结算-类别 -》解析成文字
 */
export function payoutKind(kind) {
    if (isEmpty(kind)) return ''
    return i18n.t('kind.' + kind);//trade, deposit
}

/**
 * 支付 状态数值-》解析成文字
 */
export function payStatus(payStatus) {
    if (isEmpty(payStatus)) return ''
    switch (payStatus) {
        case 'paid':
            return i18n.t('status.paid')
        case 'pending':
            return i18n.t('status.pending')
        case 'failed':
            return i18n.t('status.failed')
        case 'canceled':
            return i18n.t('status.canceled')
    }
}

export function tradeFeeStr(val) {
    if (isEmpty(val)) return '--'
    let arr = JSON.parse(val)
    let str = ''
    arr.forEach(function (item) {
        if (!isEmpty(item) && !isEmpty(item.rate) && item.rate > 0) {
            str = str + (item.card.replace('feesRate', '')) + ':' + item.rate + ' '
        }
    });
    return str;
}

/**
 * 黑名单-类别 -》解析成文字
 */
export function blacklistKind(kind) {
    if (isEmpty(kind)) return ''
    return i18n.t('risk.' + kind);//ip, email..
}

/** 转时间 */
export function toFullTime(date) {
    if (isEmpty(date)) return ''
    let format = '{y}-{m}-{d} {h}:{i}:{s}'
    if (isNumber(date)) {
        return parseTime(date, format)
    }
    return parseTime(new Date(date), format)
}

export function toMinuteTime(date) {
    if (isEmpty(date)) return ''
    let format = '{y}-{m}-{d} {h}:{i}'
    if (isNumber(date)) {
        return parseTime(date, format)
    }
    return parseTime(new Date(date), format)
}

export function toDayTime(date) {
    if (isEmpty(date)) return '--'
    return parseTime(new Date(date), '{m}-{d} {h}:{i}:{s}')
}

export function toDay(date) {
    if (isEmpty(date)) return '--'
    return parseTime(new Date(date), '{y}-{m}-{d}')
}

export function toSimpleDay(date) {
    if (isEmpty(date)) return '--'
    return parseTime(new Date(date), '{m}-{d}')
}

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [
        {value: 1E18, symbol: 'E'},
        {value: 1E15, symbol: 'P'},
        {value: 1E12, symbol: 'T'},
        {value: 1E9, symbol: 'G'},
        {value: 1E6, symbol: 'M'},
        {value: 1E3, symbol: 'k'}
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 工单问题数值-》解析成文字
 */
export function ticketQuestionStatus(caseStatus) {
    if (isEmpty(caseStatus)) return ''
    switch (caseStatus) {
        case 'OTHER':
            return i18n.t('ticket.other')
        case 'ORDER':
            return i18n.t('ticket.order')
        case 'INTERFACE':
            return i18n.t('ticket.interface')
        case 'SETTLEMENT':
            return i18n.t('ticket.settlement')
    }
}

/**
 * 工单状态数值-》解析成文字
 */
export function ticketStatus(caseStatus) {
    if (isEmpty(caseStatus)) return ''
    switch (caseStatus) {
        case 'PENDING':
            return i18n.t('ticket.pending')
        case 'WAIT_REPLY':
            return i18n.t('ticket.wait_replay')
        case 'REPLIED':
            return i18n.t('ticket.replied')
        case 'TERMINATE':
            return i18n.t('ticket.terminate')
    }
}

/**
 * 工单紧急程度数值-》解析成文字
 */
export function ticketPriority(priorityValue) {
    if (isEmpty(priorityValue)) return ''
    switch (priorityValue) {
        case 1:
            return i18n.t('ticket.plain')
        case 2:
            return i18n.t('ticket.urgent')
    }
}

/**
 * 绑定网站状态 -》解析成文字  1:正常可用, 2: 已提交待审, 3:审失败
 */
export function shopStatus(val) {
    if (isEmpty(val)) return ''
    switch (val) {
        case 1:
            return i18n.t('status.normal')
        case 2:
            return i18n.t('status.wait_review')
        case 3:
            return i18n.t('status.review_reject')
        case 4:
            return i18n.t('comm.close')
    }
}

/**
 * 结算日 -》解析成文字
 */
export function settleCycle(val) {
    if (isEmpty(val)) return '--'
    switch (val) {
        case 'monthTwoTimer':
            return i18n.t('comm.month_two_timer')
        case 'monthFourTimer':
            return i18n.t('comm.month_two_timer')
    }
}

/**
 * 争议管理状态值转文字
 */
export function disputeStatus(priorityValue) {
    if (isEmpty(priorityValue)) return ''
    switch (priorityValue) {
        case 'untreated':
            return i18n.t('dispute.untreated')
        case 'underway':
            return i18n.t('dispute.underway')
        case 'complete':
            return i18n.t('dispute.complete')
    }
}

/**
 * 争议管理状态值转文字
 */
export function shipReason(reason) {
    if (isEmpty(reason)) return ''
    switch (reason) {
        case 'search_info_fail':
            return '搜索的信息有误'
        case 'track_number_fail_or_other':
            return '本邮件号输入有误或有其他情况'
        case 'customs_pass':
            return '海关放行'
        case 'returned':
            return '被退回'
        case 'in_delivery_process':
            return '到达处理中心'
        case 'not_found':
            return '查不到'
        case 'not_deliver':
            return '未妥投'
        case 'delivering':
            return '运输途中'
        case 'leave_delivery':
            return '离开处理中心'
        case 'give_to_customs':
            return '送交海关'
        case 'diff_receive_address':
            return '签收人和地址都不一样'
        case 'than_600_after_3m':
            return '大于600美金3个月后结算'
        case 'wait_customs_clearance':
            return '快件等待清关'
        case 'miss_track_info':
            return '查不到物流'
    }
}

/**
 * 通知消息 标题类型
 */
export function noticeKindStr(title) {
    if (isEmpty(title)) return ''
    switch (title) {
        case 'announce':
            return '公告通知'
        case 'chargeback':
            return '拒付订单'
        case 'dispute':
            return '订单投诉'
        case 'ticket':
            return '工单消息'
        case 'identityPass':
            return '激活认证通过'
        case 'updatePassword':
            return '修改密码成功'
        case 'settledPayout':
            return '结算已划款'
        case 'shopSiteReviewPass':
            return '审核通过绑定网址'
        case 'shopSiteReviewReject':
            return '绑定网址审核拒绝'
        case 'manualCharge':
            return '订单重试扣款'
        case 'crmEvent':
            return '受理结果'
        case 'chargebackMonthFees':
            return '拒付处理费变更'
        case 'tradeMonthFees':
            return '交易手续费变更'
        default:
            return title;
    }
}
