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

export function registerMer(data) {
    return post('/register', data);
}

export function resendRegisterEmail(data) {
    return post('/register/resend_email', data);
}

export function resendRegisterPhone(data) {
    return post('/register/resend_phone', data);
}

export function activePhone(data) {
    return post('/active/phone', data);
}

export function activeEmail(data) {
    return post('/active/email', data);
}

export function forgetPwd(data) {
    return post('/password/forget', data);
}

export function resendForgetPwdEmail(data) {
    return post('/password/forget/resend_email', data);
}

export function resetPwd(data) {
    return post('/password/reset', data);
}
