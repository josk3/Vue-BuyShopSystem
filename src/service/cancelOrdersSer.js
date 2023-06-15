import {post} from '@/utils/request'

/**
 * cancel orders
 */
export function cancelOrdersSearch(params) {
    return post('/cancel_orders/search', params);
}
