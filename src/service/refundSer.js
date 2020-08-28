import {post} from '@/utils/request'

/**
 * 退款
 */
export function refundSearch(params) {
    return post('/refund/search', params);
}
