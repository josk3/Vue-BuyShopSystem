import {get, post} from '@/utils/request'

/**
 * 网站，网址，商铺
 */

export function getSiteSystemList() {
    return get('/shop/site_system_list', '');
}

export function shopSearch(params) {
    return post('/shop/search', params);
}

export function addShop(params) {
    return post('/shop/add', params);
}

export function updateShop(params) {
    return post('/shop/update', params);
}

export function closeShop(params) {
    return post('/shop/close', params);
}

export function openShop(params) {
    return post('/shop/open', params);
}

export function resubmit(params) {
    return post('/shop/resubmit', params);
}

