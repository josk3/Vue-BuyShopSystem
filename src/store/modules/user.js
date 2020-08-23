import {login, logout, getInfo} from '@/service/userSer'
import {getToken, setToken, removeToken} from '@/service/auth/token'
import {resetRouter} from '@/router'

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
        notice: 0
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
                commit('SET_TOKEN', data.token)
                commit('SET_USER', data.user)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    loadUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
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
