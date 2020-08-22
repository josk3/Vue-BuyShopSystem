import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'post',
        data: {token: token}
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}
