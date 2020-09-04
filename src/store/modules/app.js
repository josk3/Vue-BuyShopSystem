import Cookies from 'js-cookie'

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium',
    lang: Cookies.get('lang') ? Cookies.get('lang') :
        ((navigator.language || navigator.browserLanguage).toLowerCase().includes('zh-cn') ? 'zh' : 'en'),
    rf: '',
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    },
    SET_LANG: (state, lang) => {
        state.lang = lang
        Cookies.set('lang', lang)
    },
    SET_RF: (state, rf) => {
        state.rf = rf
        Cookies.set('rf', rf)
    }
}

const actions = {
    toggleSideBar({commit}) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setSize({commit}, size) {
        commit('SET_SIZE', size)
    },
    setLang({commit}, lang) {
        commit('SET_LANG', lang)
    },
    getLang() {
        return state.lang
    },
    setRf({commit}, rf) {
        commit('SET_RF', rf)
    },
    getRf() {
        return state.rf
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
