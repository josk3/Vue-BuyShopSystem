import request, {post}  from '@/utils/request'

export function ticketCreate(data) {
    return post('/ticket/create', data);
}

export function search(data) {
    return post('/ticket/search', data);
}

//...

export function getTicket(ticketId) {
    return request({
        url: '/ticket/get',
        method: 'get',
        params: {id: ticketId}
    })
}
