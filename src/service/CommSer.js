import MessageBox from "element-ui/packages/message-box/src/main";
import {isEmpty} from "@/utils/validate";
import configs from "@/configs";

/**
 * 通用, 简单的功能
 */

let online_box_show = false
export function alertUnOnlineStatus(callback) {
    if (online_box_show === false) {
        online_box_show = true
        MessageBox.confirm('当前账户状态：未开通，请联系我们开通商户号。', '未开通', {
            confirmButtonText: '联系我们',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
        }).then(() => {
            if (!isEmpty(callback)) callback(true)
            location.href = configs.contactUsUrl
        }).catch(() => {
            if (!isEmpty(callback)) callback(false)
        }).finally(() => {
            online_box_show = false
        });
    }
}

