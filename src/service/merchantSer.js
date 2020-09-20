import {get, post, postArray, upload} from '@/utils/request'

/**
 * 商户
 */
export function getMerInfo() {
    return get('/merchant/info', ''); //当前登录状态下的mer
}

export function getMerIdentity() {
    return get('/merchant/identity', ''); //当前登录状态下的mer
}

export function updateIdentity(params) {
    return upload('/merchant/update/identity', params);
}

export function getMerSetup(type) {
    return get('/merchant/setup', {type: type}); //当前登录状态下的mer
}

export function updateMerSetup(params) {
    return post('/merchant/setup', params); //当前登录状态下的mer
}

export function getBalances(params) {
    return post('/merchant/balances', params);
}


//-
export function addBank(params) {
    return postArray('/merchant/bank/add', params);
}

//--
export function getAllMenus() {
    return get('/merchant/menus', '');
}

export function roleSearch(params) {
    return post('/merchant/role/search', params);
}

export function addRole(params) {
    return post('/merchant/role/add', params);
}

export function updateRole(params) {
    return post('/merchant/role/update', params);
}

export function userSearch(params) {
    return post('/merchant/user/search', params);
}

export function addUser(params) {
    return post('/merchant/user/add', params);
}

export function updateUser(params) {
    return post('/merchant/user/update', params);
}

export function disableUser(params) {
    return post('/merchant/user/disable', params);
}

export function enableUser(params) {
    return post('/merchant/user/enable', params);
}
