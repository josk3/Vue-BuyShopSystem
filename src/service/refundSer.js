import {post,download} from '@/utils/request'

/**
 * 退款
 */
export function refundSearch(params) {
    return post('/refund/search/v2', params);
}

export function applyRefund(params) {
    return post('/refund/apply', params);
}

export function cancelApply(params) {
    return post('/refund/cancel', params);
}

export function refundDownload(params){
    return download("/refund/download",params);
}