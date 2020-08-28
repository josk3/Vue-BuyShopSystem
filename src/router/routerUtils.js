import {isArray, isObject, isEmpty, isString} from "@/utils/validate";
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
    'faq': {
        component: () => import('@/views/portal/faq/index'),
        meta: {noCache: true}
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
    'decline_manage': {
        component: () => import('@/views/portal/decline'),
        meta: { noCache: true}
    },
    'refund_select': {
        component: () => import('@/views/portal/refund'),
        meta: { noCache: true}
    },
    'finance_select': {
        name: 'finance_select',
        meta: {noCache: true}
    },
    'finance_search': {
        component: () => import('@/views/portal/finance/finance'),
        meta: { noCache: true}
    },
    'settle_search': {
        component: () => import('@/views/portal/finance/settle'),
        meta: { noCache: true}
    },
    'chargeback_select': {
        component: () => import('@/views/portal/chargeback'),
        meta: {icon: 'user', noCache: true}
    },
    'support_ticket': {
        component: () => import('@/views/portal/ticket/index'),
        meta: {noCache: true}
    },
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
            name: 'homePage1',
            meta: {title: 'Dashboard', icon: 'dashboard', affix: true}
        },
        {
            path: '/profile',
            component: () => import('@/views/portal/profile'),
            name: '/profile',
            hidden: true,
        },
        {
            path: '/faq',
            component: () => import('@/views/portal/faq'),
            name: 'faq',
            hidden: true,
        },
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

