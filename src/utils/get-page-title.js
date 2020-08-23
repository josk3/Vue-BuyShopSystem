import configs from '@/configs'
import i18n from "@/service/i18n";
import {toLower} from "@/utils/strUtils";

const title = i18n.t(configs.title)

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    let iTitle = i18n.t('nav.' + toLower(pageTitle))
    return `${iTitle} - ${title}`
  }
  return `${title}`
}
