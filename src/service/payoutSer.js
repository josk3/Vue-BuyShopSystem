import {post} from '@/utils/request'

/**
 * 结算
 */
export function waitApply(params) {
    return post('/payout/wait/apply', params);
}

export function payoutApply(params) {
    return post('/payout/apply', params);
}

export function payoutSearch(params) {
    return post('/payout/search', params);
}
