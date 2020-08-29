import {post, get} from '@/utils/request'

/**
 * 物流
 */
export function deliverySearch(params) {
    return post('/delivery/search', params);
}

export function deliveryDownload(params) {
    return post('/delivery/download', params);
}

export function deliveryUpload(params) {
    return post('/delivery/upload', params);
}

export function deliveryAdd(params) {
    return post('/delivery/add', params);
}

export function getTrackBrands() {
    return get('/delivery/brand/all', '');
}
