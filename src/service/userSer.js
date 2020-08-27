import request, {post} from '@/utils/request'

export function login(data) {
    return post('/login', data);
}

export function getInfo(token) {
    return post('/user/info', {token: token});
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

export function forgetPwd(data) {
    return post('/password/forget', data);
}

export function resendForgetPwdEmail(data) {
    return post('/password/forget/resend', data);
}

export function resetPwd(data) {
    return post('/password/reset', data);
}
