import {post, get, upload} from '@/utils/request'

/**
 * 物流
 */
export function deliverySearch(params) {
    return post('/delivery/search', params);
}

export function deliveryDownload(params) {
    return post('/delivery/download', params);
}

export function deliveryAdd(params) {
    return post('/delivery/add', params);
}

export function getTrackBrands() {
    return get('/delivery/brand/all', '');
}

export function deliveryUpload(formData, progressCallback) {
    return upload('/delivery/upload', formData , progressCallback);
}
