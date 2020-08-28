// import parseTime, formatTime and set to filter
import {isEmpty} from "@/utils/validate";
import i18n from "@/service/i18n";
import {parseTime} from "@/utils";

export {parseTime, formatTime} from '@/utils'

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
