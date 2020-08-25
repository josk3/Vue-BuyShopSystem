import {post} from '@/utils/request'
import {isEmpty} from "@/utils/validate";
import i18n from "@/service/i18n";

/**
 * 退款
 */
export function refundSearch(params) {
    return post('/refund/search', params);
}

export function refundStr(isRefund) {
    if (isEmpty(isRefund)) return ''
    switch (isRefund) {
        case 16:
            return i18n.t('refund.wait_bank_receive')
        //...
    }
}