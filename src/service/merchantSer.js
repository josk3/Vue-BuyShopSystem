import {get, post} from '@/utils/request'

/**
 * 商户
 */
export function getMerInfo() {
    return get('/merchant/info', ''); //当前登录状态下的mer
}

export function getMerIdentity() {
    return get('/merchant/identity', ''); //当前登录状态下的mer
}

export function getMerSetup(type) {
    return get('/merchant/setup', {type: type}); //当前登录状态下的mer
}

export function updateMerSetup(params) {
    return post('/merchant/setup', params); //当前登录状态下的mer
}
