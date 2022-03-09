import {get, post,download} from '@/utils/request'

/**
 * 订单
 */
export function getOrder(tradeId) {
    return get('/order/get/' + tradeId, '');
}

export function getTimeline(tradeId) {
    return get('/order/timeline/' + tradeId, '');
}

export function ordersSearch(params) {
    return post('/orders/search/v2', params);
}

export function ordersDownload(params) {
    return download('/orders/download',params);
}

export function cancelPendingOrder(params) {
    return post('/order/cancel/pending', params);
}