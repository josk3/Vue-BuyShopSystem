import {post} from '@/utils/request'

/**
 * fast pay
 */
export function fastPaySearch(params) {
    return post('/fast_pay/search', params);
}

export function fastPayAdd(params) {
    return post('/fast_pay/new', params);
}
