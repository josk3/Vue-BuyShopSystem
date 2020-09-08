import {get, post} from '@/utils/request'

/**
 * 通知，公告相关
 */
export function getLastAnnounce() {
    return get('/announce/last', '');
}

export function getUnReadLast5Notice() {
    return get('/notice/un_read/last5', '');
}

export function searchNotice(params) {
    return post('/notice/search', params);
}

export function markAllRead(params) {
    return post('/notice/mark/all/read', params);
}

export function getAnnounce(nid) {
    return get('/announce/detail/' + nid, '');
}

export function getNotify(nid) {
    return get('/notice/detail/' + nid, '');
}

