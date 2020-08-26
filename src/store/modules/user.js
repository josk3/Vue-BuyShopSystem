import {getInfo, login, logout} from '@/service/userSer'
import {getToken, removeToken, setToken} from '@/service/auth/token'
import router, {resetRouter} from '@/router'
import {convertRouters} from "@/router/routerUtils";
import {isEmpty} from "@/utils/validate";

const state = {
    token: getToken(),
    user: {
        uid: null,
        username: null,
        name: null,
        email: null,
        second_login: null,
        status: null,
        identifier_status: null,
        mer_no: null,
        notice_count: 0
    },
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: []//侧边目录
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_MENUS: (state, menus) => {
        state.menus = menus
    },
    SET_USER: (state, user) => {
        state.user = user
        state.name = user.name
    },
}

const actions = {
    // user login
    login({commit}, params) {
        return new Promise((resolve, reject) => {
            login(params).then(response => {
                const {data} = response
                if (isEmpty(data.token)) {
                    new Error('Login Error')
                }
                commit('SET_TOKEN', data.token)
                commit('SET_USER', data.user)
                commit('SET_MENUS', data.menus)
                setToken(data.token)
                //后端数据 add router
                if (!isEmpty((data.menus))) {
                    router.addRoutes(convertRouters(data.menus))
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    loadUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            if (isEmpty(getToken())) reject('401')
            getInfo(state.token).then(response => {
                const {data} = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const {menus, user} = data
                // menus must be a non-empty array
                if (!menus || menus.length <= 0) {
                    reject('menus must be a non-null array!')
                }
                commit('SET_MENUS', menus)
                commit('SET_USER', user)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    updateUser({commit}, newData) {
        if (newData !== undefined && newData !== '') {
            commit('SET_USER', newData);
        }
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_MENUS', [])
                removeToken()
                resetRouter()

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_MENUS', [])
            removeToken()
            resolve()
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
