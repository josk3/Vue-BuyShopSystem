import {post, download} from '@/utils/request'

/**
 * 财务
 */
export function financeSearch(params) {
    return post('/finance/search', params);
}

export function financeDownload(params) {
    return download('/finance/download', params);
}

export function settleSearch(params) {
    return post('/settle/search', params);
}

export function settleSummary(params) {
    return post('/settle/summary', params);
}

export function settleDownload(params) {
    return download('/settle/download', params);
}
