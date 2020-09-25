import {upload, get, post} from '@/utils/request'

export function ticketReply(formData, progressCallback) {
    return upload('/ticket/reply', formData, progressCallback);
}

/**
 * 工单详情
 */
export function ticketDetailInfo(ticket) {
    return get("/ticket/detail/" + ticket, '');
}

/**
 * 关闭工单
 */
export function closeTicket(ticket) {
    return post("/ticket/close", ticket);
}

/**
 * 图片预览
 */
export function previewImg(path) {
    return get("/ticket/preview", path);
}