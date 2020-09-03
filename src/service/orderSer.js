import {get, post} from '@/utils/request'

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
    return post('/orders/search', params);
}

