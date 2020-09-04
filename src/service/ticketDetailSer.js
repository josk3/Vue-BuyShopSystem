import request, {post}  from '@/utils/request'

export function ticketReply(data) {
    return post('/ticket/reply', data);
}

export function ticketDetailInfo(ticketId) {
    return request({
        url: '/ticket/detailInfo',
        method: 'get',
        params: {id: ticketId}
    })
}
