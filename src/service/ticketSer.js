import request, {post, upload} from '@/utils/request'

export function ticketCreate(fromData, progressCallback) {
    return upload('/ticket/create', fromData, progressCallback);
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
