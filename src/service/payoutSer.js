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
    return post('/payout/search/v2', params);
}

/**
 * 下载结算申请历史
 */
export function applicantHistoryDownload(params) {
    return download('/payout/download', params);
}


/**
 * 保证金申请相关
 */
export function depositApplyPreview(params) {
    return post('/deposit/apply/preview_summary', params);
}

export function depositApplySubmit(params) {
    return post('/deposit/apply/submit', params);
}

export function depositApplyHistory(params) {
    return post('/deposit/apply/search', params);
}
