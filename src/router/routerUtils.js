import {isArray, isEmpty, isObject, isString} from "@/utils/validate";
import Layout from "@/layout/index";
import blank from "@/layout/blank";

/**
 * 名称必须唯一不重复，且与后端一致!!
 * 维护列表
 */
export const routerUtils = {
    'profile': {
        component: () => import('@/views/portal/profile/index'),
        meta: {title: 'Profile', icon: 'user', noCache: true}
    },
    'payout_select': {
        name: 'payout_select',
        meta: {noCache: true}
    },
    'payout_apply': {
        component: () => import('@/views/portal/payout/apply'),
        meta: {noCache: true}
    },
    'payout_history': {
        component: () => import('@/views/portal/payout/history'),
        meta: {icon: 'user', noCache: true}
    },
    'deposit_apply': {
        component: () => import('@/views/portal/payout/depositApply'),
        meta: {noCache: true}
    },
    'decline_manage': {
        component: () => import('@/views/portal/decline'),
        meta: {noCache: true}
    },
    'refund_select': {
        component: () => import('@/views/portal/refund'),
        meta: {noCache: true}
    },
    'finance_select': {
        name: 'finance_select',
        meta: {noCache: true}
    },
    'finance_search': {
        component: () => import('@/views/portal/finance/finance'),
        meta: {noCache: true}
    },
    'settle_search': {
        component: () => import('@/views/portal/finance/settle'),
        meta: {noCache: true}
    },
    'support_ticket': {
        component: () => import('@/views/portal/ticket/index'),
        meta: {noCache: true}
    },
    'fast_pay': {
        component: () => import('@/views/portal/fast_pay'),
        meta: {noCache: true}
    },
    'delivery_manage': {
        component: () => import('@/views/portal/delivery'),
        meta: {noCache: true}
    },
    'risk_manage': {
        name: 'risk_manage',
        meta: {noCache: true}
    },
    'risk_area': {
        component: () => import('@/views/portal/risk/area'),
        meta: {noCache: true}
    },
    'blacklist': {
        component: () => import('@/views/portal/risk/blacklist'),
        meta: {noCache: true}
    },
    'account_manage': {
        name: 'account_manage',
        meta: {noCache: true}
    },
    'merchant_info': {
        component: () => import('@/views/portal/account/info'),
        meta: {noCache: true}
    },
    'merchant_identity': {
        component: () => import('@/views/portal/account/identity'),
        meta: {noCache: true}
    },
    'active_account': {
        component: () => import('@/views/portal/account/identity'),
        meta: {noCache: true,name:'merchant_identity'}
    },
    'merchant_setup': {
        component: () => import('@/views/portal/account/setup'),
        meta: {noCache: true}
    },
    'merchant_users': {
        component: () => import('@/views/portal/account/users'),
        meta: {noCache: true}
    },
    'merchant_shop': {
        component: () => import('@/views/portal/account/shop'),
        meta: {noCache: true}
    },
    'trade_manage': {
        component: () => import('@/views/portal/orders/search'),
        meta: {noCache: true}
    },
    'order_detail': {
        component: () => import('@/views/portal/orders/detail'),
        meta: {noCache: true}
    },
    'dispute_manage': {
        component: () => import('@/views/portal/dispute/index'),
        meta: {noCache: true}
    },
    'message_center': {
        component: () => import('@/views/portal/notice/index'),
        meta: {noCache: true}
    },
    'dispute_detail': {
        component: () => import('@/views/portal/dispute/disputeDetail'),
        meta: {noCache: true}
    },
    'data_statistics': {
        component: () => import('@/views/portal/report/index'),
        meta: {noCache: true}
    }
}

function resolveMenu(menu) {
    if (isEmpty(menu) || !isObject(menu)) {
        return null;
    }
    let name = menu.name
    let routeVal = routerUtils[name];
    if (isEmpty(routeVal)) return null;
    if (isEmpty(routeVal.name)) routeVal.name = name
    if (routeVal.path === undefined) routeVal.path = menu.path //优先使用配置的值
    return routeVal;
}

/**
 * 解析成vue-router可用
 * @param userMenu 后端返回的数组
 */
export function convertRouters(userMenu) {
    if (!userMenu || !isArray(userMenu) || userMenu.length <= 0) {
        return [];
    }

    let sideMenu = [];
    for (let i = 0; i < userMenu.length; i++) {
        let menu = userMenu[i]
        let getMenu = resolveMenu(menu);
        if (isEmpty(getMenu) || !isObject(getMenu)) {
            continue
        }
        //暂时只支持两级
        if (!isEmpty(menu.children) && isArray(menu.children)) {
            let child = menu.children;
            //let childList = [];
            for (let r = 0; r < child.length; r++) {
                let childItem = resolveMenu(child[r]);
                if (isEmpty(childItem)) continue;
                //childList.push(childItem);
                //路由跟menu区别 , 路由不放在child
                sideMenu.push(childItem);
            }
            //if (childList.length > 0) {
            //路由跟menu区别 getMenu.children = childList;
            //路由不放在child
            //}
        }
        sideMenu.push(getMenu);
    }
    sideMenu.push(
        {
            path: '',
            component: () => import('@/views/portal/home'),
            name: 'homePage',
            meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
        },
        {
            path: '/home',
            component: () => import('@/views/portal/home'),
            name: 'dashboard',
            meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
        },
        {
            path: '/profile',
            component: () => import('@/views/portal/profile'),
            name: 'profile',
            hidden: true,
        },
        {
            path: '/faq',
            component: () => import('@/views/portal/faq'),
            name: 'faq',
            hidden: true,
        },
        {
            path: '/order/detail/:id',
            name: 'order_detail',
            component: () => import('@/views/portal/orders/detail'),
            hidden: true,
        },
        {
            path: '/message/center/:type',
            name: 'message_center_type',
            component: () => import('@/views/portal/notice/index'),
            hidden: true,
        },
        {
            path: '/announce/detail/:id',
            name: 'announce_detail',
            component: () => import('@/views/portal/notice/announceDetail'),
            hidden: true,
        },
        {
            path: '/notify/detail/:id',
            name: 'notify_detail',
            component: () => import('@/views/portal/notice/notifyDetail'),
            hidden: true,
        },
        {
            path: '/ticket/detail/:id',
            component: () => import('@/views/portal/ticket/ticketDetail'),
            name: 'ticket_detail',
            hidden: true,
        },
        {
            path: '/ticket/preview',
            component: () => import('@/views/portal/dispute/disputeDetail'),
            name: 'ticket_preview',
            hidden: true,
        },
        {
            path: '/dispute/detail/:id',
            component: () => import('@/views/portal/dispute/disputeDetail'),
            name: 'dispute_detail',
            hidden: true,
        },
        {
            path: '/e_signature/detail/:id',
            name: 'e_signature',
            component: () => import('@/views/public/eSignature'),
            hidden: true,
        },
        {
            path: '/e_signature/sign_success/:sId',
            name: 'e_signature_success',
            component: () => import('@/views/public/eSignature'),
            hidden: true,
        }
    )
    return [
        {
            path: '',
            component: Layout,
            children: sideMenu
        },
        {
            path: '*',
            component: blank,
            redirect: '/404',
            hidden: true
        }
    ];
}

function findItem(type, val, routerList) {
    if (isEmpty(val) || isEmpty(routerList) || !isArray(routerList)) return null
    if (isEmpty(type)) return null
    if (routerList.length < 0) return null
    for (let r = 0; r < routerList.length; r++) {
        let item = routerList[r];
        if (isEmpty(item)) continue;
        if (type === 'path') {
            if (item.path === val) return item;
        } else if (type === 'name') {
            if (item.name === val) return item;
        }
        if (!isEmpty(item.children) && item.children.length > 0) {
            let checkChildren = findItem(type,val,item.children);
            if (!isEmpty(checkChildren)) {
                return checkChildren;
            }
        }
    }
    return null
}

export function findPath(path, routerList) {
    return findItem('path', path, routerList);
}

export function findName(name, routerList) {
    return findItem('name', name, routerList);
}

export function renderRedirectTo(redirectTo) {
    if (isEmpty(redirectTo) || !isString(redirectTo) || redirectTo === '/') return ''
    return '?redirect=' + (redirectTo.startsWith('/') ? redirectTo.replace('/', '') : redirectTo);
}

