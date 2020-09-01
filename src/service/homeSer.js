import request from '@/utils/request'

/**
 * 首页
 */
export function getLastDate(params) {
    return request({
        url: '/report/last_data',
        method: 'post',
        data: params
    })
}
