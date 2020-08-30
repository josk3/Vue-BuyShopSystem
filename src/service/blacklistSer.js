import {del, post} from '@/utils/request'

/**
 * 黑名单
 */
export function blacklistSearch(params) {
    return post('/blacklist/search', params);
}

export function blacklistDel(params) {
    return del('/blacklist/delete', params);
}

export function blacklistDisable(params) {
    return post('/blacklist/disable', params);
}

export function blacklistEnable(params) {
    return post('/blacklist/enable', params);
}

export function blacklistAdd(params) {
    return post('/blacklist/add', params);
}
