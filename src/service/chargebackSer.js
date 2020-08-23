import request from '@/utils/request'

/**
 * @param day 最近几天的数据
 */
export function getLastOrders(day) {
    return request({
        url: '/order/last/day',
        method: 'post',
        data: {day: day}
    })
}
