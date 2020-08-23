import request from '@/utils/request'

/**
 * 拒付查询
 */
export function getChargeback(params) {
    return request({
        url: '/chargeback/search',
        method: 'post',
        data: params
    })
}
