import {post} from '@/utils/request'

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
    return post("/dispute/disputeDetail", dispute);
}

/**
 * 追加争议消息
 */
export function appendDispute(params) {
    return post("/dispute/appendDispute", params);
}

/**
 * 根据争议工号获取争议信息
 */
export function disputeInfo(dispute) {
    return post("/dispute/disputeInfo", dispute);
}

/**
 * 更新争议状态
 */
export function updateDispute(params) {
    return post("/dispute/updateDispute", params)
}
