import {get} from '@/utils/request'

/**
 * 报告统计
 */
export function last24Hours() {
    return get('/report/last24Hours', '');
}

export function last30Days() {
    return get('/report/last30Days', '');
}
