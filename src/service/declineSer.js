import {post} from '@/utils/request'

/**
 * 拒付
 */
export function declineSearch(params) {
    return post('/decline/search', params);
}

export function declineDownload(params) {
    return post('/decline/download', params);
}

export function declineSupply(params) {
    return post('/decline/supply', params);
}
