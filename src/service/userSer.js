import request, {post} from '@/utils/request'

export function login(data) {
    return post('/login', data);
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
