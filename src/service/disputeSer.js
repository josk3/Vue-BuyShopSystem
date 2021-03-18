import {post, get, download, upload} from '@/utils/request'

/**
 * 争议展示列表
 */
export function disputeSearch(params) {
    return post("/dispute/search", params);
}

/**
 * 争议邮箱详情
 */
export function disputeDetail(dispute) {
    return get("/dispute/detail/" + dispute, "");
}

/**
 * 追加争议消息
 */
export function finishDispute(params) {
    return upload("/dispute/finish", params);
}

/**
 * 更新争议状态
 */
export function updateDispute(params) {
    return post("/dispute/update", params)
}

/**
 * 争议下载
 */
export function disputeDownload(params) {
    return download('/dispute/download', params);
}

/**
 *
 */
export function attachDownload(params){
    return download("/dispute/attach", params);
}