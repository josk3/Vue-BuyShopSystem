import {post} from '@/utils/request'

/**
 * 投诉展示列表
 */
export function disputeSearch(params) {
    return post("/dispute/search", params);
}

/**
 * 投诉邮箱详情
 */
export function disputeDetail(dispute) {
    return post("/dispute/disputeDetail", dispute);
}

/**
 * 追加投诉消息
 */
export function appendDispute(params) {
    return post("/dispute/appendDispute", params);
}

/**
 * 根据投诉工号获取投诉信息
 */
export function disputeInfo(dispute) {
    return post("/dispute/disputeInfo", dispute);
}

/**
 * 更新投诉状态
 */
export function updateDispute(params) {
    return post("/dispute/updateDispute", params)
}