import {login, logout, getInfo} from '@/service/userSer'
import {getToken, setToken, removeToken} from '@/service/auth/token'
import {resetRouter} from '@/router'

const state = {
    token: getToken(),
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
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                const {data} = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const {menus, user} = data
                console.log(user)
                console.log(menus)
                const merchant = data.merchant
                console.log(merchant)
                console.log(data.merchant)

                // menus must be a non-empty array
                if (!menus || menus.length <= 0) {
                    reject('getInfo: menus must be a non-null array!')
                }

                commit('SET_MENUS', menus)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
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
