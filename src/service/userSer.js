import {get, post, postHandleError} from '@/utils/request'

export function login(data) {
    return post('/login', data);
}

export function getInfo(token) {
    return post('/user/info', {token: token});
}

export function logout() {
    return get('/logout', '');
}

export function registerMer(data) {
    return postHandleError('/register', data);
}

export function resendRegisterEmail(data) {
    return postHandleError('/register/resend_email', data);
}

export function resendRegisterPhone(data) {
    return postHandleError('/register/resend_phone', data);
}

export function activePhone(data) {
    return postHandleError('/active/phone', data);
}

export function activeEmail(data) {
    return post('/active/email', data);
}

export function forgetPwd(data) {
    return postHandleError('/password/forget', data);
}

export function resendForgetPwdEmail(data) {
    return postHandleError('/password/forget/resend_email', data);
}

export function resetPwd(data) {
    return postHandleError('/password/reset', data);
}
