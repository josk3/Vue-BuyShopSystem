import {upload, get, post, download} from '@/utils/request'

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
 * 下载工单文件
 */
export function ticketFileDownload(params){
    return download("/ticket/attach",params)
}

/**
 * 关闭工单
 */
export function closeTicket(ticket) {
    return post("/ticket/close", ticket);
}