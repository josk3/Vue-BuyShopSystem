import MessageBox from "element-ui/packages/message-box/src/main";
import {isEmpty} from "@/utils/validate";
import configs from "@/configs";
import user from "@/store/modules/user";
import i18n from "@/service/i18n";

/**
 * 通用, 简单的功能
 */

let online_box_show = false

export function alertUnOnlineStatus(callback) {
    if (online_box_show === false) {
        online_box_show = true
        let merNo = '';
        if (!isEmpty(user) && !isEmpty(user.state) && !isEmpty(user.state.user)) {
            merNo = user.state.user.mer_no;
        }
        let txt = '当前账户状态：未开通，请联系我们开通商户号。';
        if (!isEmpty(merNo)) txt = txt + '<br/>' + (i18n.t('user.mer_no') + ': <b>' + merNo + '</b>')
        MessageBox.confirm(txt, '未开通', {
            confirmButtonText: '联系我们',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            dangerouslyUseHTMLString: true,
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

