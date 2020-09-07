import {get} from '@/utils/request'

/**
 * 通知，公告相关
 */
export function getLastAnnounce() {
    return get('/announce/last', '');
}

