import {post} from '@/utils/request'

/**
 * 退款
 */
export function refundSearch(params) {
    return post('/refund/search', params);
}

export function applyRefund(params) {
    return post('/refund/apply', params);
}

export function cancelApply(params) {
    return post('/refund/cancel', params);
}
