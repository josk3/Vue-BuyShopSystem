import {get} from '@/utils/request'

/**
 * 订单
 */
export function getOrder(tradeId) {
    return get('/order/get/' + tradeId, '');
}
