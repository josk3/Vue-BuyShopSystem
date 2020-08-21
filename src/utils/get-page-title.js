import configs from '@/configs'

const title = configs.title || 'Merchant Portal'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
