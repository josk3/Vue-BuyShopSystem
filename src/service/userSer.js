import {get, post, postHandleError} from '@/utils/request'
import {isArray, isEmpty} from "@/utils/validate";

export function hasPermission(perm, permissionLists) {
    if (isEmpty(permissionLists)) return false;
    if (isEmpty(perm)) return true;
    if (!isArray(permissionLists)) return false;
    return permissionLists.includes(perm);
}

export function login(data) {
    return postHandleError('/login', data);
}

export function getInfo(token) {
    return post('/user/info', {token: token});
}

export function getUserInfo() {
    return get('/user/info', '');
}

export function updateUserInfo(params) {
    return post('/user/update_info', params);
}

export function logout() {
    return get('/logout', '');
}

export function registerMer(data) {
    return postHandleError('/register', data, 10000);//10s
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

export function resendForgetPwdCode(data) {
    return postHandleError('/password/forget/resend_code', data);
}

export function forgetValidPhoneCode(data) {
    return postHandleError('/password/forget/valid_phone_code', data);
}

export function forgetValidEmailCode(data) {
    return postHandleError('/password/forget/valid_email_code', data);
}

//-
export function updatePwd(data) {
    return post('/password/update', data);
}
