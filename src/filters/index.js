// import parseTime, formatTime and set to filter
import {isEmpty} from "@/utils/validate";
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
            return i18n.t('status.disable')
        case 1:
            return i18n.t('status.normal')
    }
}

/**
 * 状态数值-》解析成文字
 */
export function refundStatus(isRefund) {
    if (isEmpty(isRefund)) return ''
    switch (isRefund) {
        case 0:
            return i18n.t('refund.un_refund')
        case 1:
            return i18n.t('refund.all_amount_refund')
        case 2:
            return i18n.t('refund.part_refund')
        case 13:
            return i18n.t('refund.apply_refund')
        case 14:
            return i18n.t('refund.cancel_refund')
        case 15:
            return i18n.t('refund.reject_refund')
        case 16:
            return i18n.t('refund.wait_bank_receive')
        case 17:
            return i18n.t('refund.bank_accept_refund')
        case 18:
            return i18n.t('refund.bank_reject_refund')
        case 19:
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

/**
 * 黑名单-类别 -》解析成文字
 */
export function blacklistKind(kind) {
    if (isEmpty(kind)) return ''
    return i18n.t('risk.' + kind);//ip, email..
}

/** 转时间 */
export function toDayTime(date) {
    if (isEmpty(date)) return ''
    return parseTime(new Date(date), '{m}-{d} {h}:{i}:{s}')
}

export function toDay(date) {
    if (isEmpty(date)) return ''
    return parseTime(new Date(date), '{y}-{m}-{d}')
}

export function toSimpleDay(date) {
    if (isEmpty(date)) return ''
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
        case '0':
            return i18n.t('ticket.plain')
        case '1':
            return i18n.t('ticket.urgent')
    }
}
