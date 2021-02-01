import {del, post,upload,download} from '@/utils/request'

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

/**
 * 批量上传黑名单
 */
export function uploadBlackList(params, blackListFile) {
    return upload('/blacklist/upload', params, blackListFile);
}
/**
 * 模板下载
 */
export function downloadTemplate(){
    return download('/blacklist/templates/download');
}