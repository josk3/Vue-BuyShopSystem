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
