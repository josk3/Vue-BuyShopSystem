import {post} from '@/utils/request'

/**
 * 财务
 */
export function financeSearch(params) {
    return post('/finance/search', params);
}

export function financeDownload(params) {
    return post('/finance/download', params);
}

export function settleSearch(params) {
    return post('/settle/search', params);
}
