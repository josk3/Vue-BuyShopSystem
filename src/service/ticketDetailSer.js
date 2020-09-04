import request, {upload}  from '@/utils/request'

export function ticketReply(formData,progressCallback) {
    return upload('/ticket/reply', formData,progressCallback);
}

export function ticketDetailInfo(ticketId) {
    return request({
        url: '/ticket/detailInfo',
        method: 'get',
        params: {id: ticketId}
    })
}
