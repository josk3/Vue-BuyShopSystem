import {post, postArray,download} from '@/utils/request'

/**
 * 结算
 */
export function waitApply(params) {
    return post('/payout/wait/apply', params);
}

export function payoutApply(params) {
    return postArray('/payout/apply', params);
}

export function payoutSearch(params) {
    return post('/payout/search', params);
}

/**
 * 下载结算申请历史
 */
export function applicantHistoryDownload(params) {
    return download('/payout/download', params);
}
