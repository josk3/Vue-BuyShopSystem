import configs from '@/configs'
import i18n from "@/service/i18n";
import {toLower} from "@/utils/strUtils";
import {isEmpty, isObject} from "@/utils/validate";

export function reloadPageTitle(currentRoute) {
    let title;
    if (!isEmpty(currentRoute) || !isObject(currentRoute)) {
        title = getPageTitle(currentRoute.meta.title || currentRoute.name);
    }else {
        title = configs.title;
    }
    document.title = i18n.t(title).toString();
}

export default function getPageTitle(pageTitle) {
    if (!isEmpty(pageTitle)) {
        let iTitle = i18n.t('nav.' + toLower(pageTitle))
        return iTitle + ' - ' + i18n.t(configs.title)
    }
    return i18n.t(configs.title)
}
