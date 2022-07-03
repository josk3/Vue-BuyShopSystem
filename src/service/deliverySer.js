import {post, get, upload, download} from '@/utils/request'

/**
 * 物流
 */
export function deliverySearch(params) {
    return post('/delivery/search/v2', params);
}

export function deliveryDownload(params) {
    return download('/delivery/download', params);
}

export function getIsSettleDay() {
    return post('/delivery/is_settle_day', '');
}

export function deliveryAdd(params) {
    return post('/delivery/new', params);
}

export function getTrackBrands() {
    return get('/delivery/brand/all', '');
}

export function deliveryUpload(formData, progressCallback) {
    return upload('/delivery/upload', formData , progressCallback);
}

export function getVirtualStatus() {
    return get('/delivery/virtual/status', '');
}

export function batchAutoVirtualShip() {
    return post('/delivery/virtual/batch_auto_ship', '');
}

export function downloadShipBrandCode() {
    return download('/delivery/download_ship_brand_code', '');
}
