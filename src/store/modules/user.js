import {
	getInfo,
	login,
	logout
} from '@/service/userSer'
import {
	getToken,
	removeToken,
	setToken
} from '@/service/auth/token'
import router, {
	resetRouter
} from '@/router'
import {
	convertRouters
} from "@/router/routerUtils";
import {
	isEmpty,
	isObject
} from "@/utils/validate";

const state = {
	token: getToken(),
	user: {
		uid: null,
		username: null,
		full_name: null,
		is_master: true,
		email: null,
		second_login: null,
		status: null,
		identity_status: 0,
		name: null,
		mer_no: null,
		online: true,
		notice_count: 0,
		popup: null,
		monitor_ecm: 0, //实时拒付率-当月(每月清)
		total_ecm: 0, //商户总拒付率
		last_monthly_ecm: 0,
		total_declined_num: 0, //总拒付笔数
		allow_personal: 0,

	},
	roles: [],
	menus: [], //侧边目录
	permissions: [],
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_MENUS: (state, menus) => {
		state.menus = menus
	},
	SET_PERMISSIONS: (state, permissions) => {
		state.permissions = permissions
	},
	SET_USER: (state, user) => {
		state.user = user
	},
	GET_USER: (state) => {
		return state.user
	},
}

const actions = {
	// user login
	login({
		commit
	}, params) {
		return new Promise((resolve, reject) => {
			login(params).then(response => {
				const {
					data
				} = response
				if (isEmpty(data.token)) {
					new Error('Login Error')
				}
				commit('SET_TOKEN', data.token)
				commit('SET_USER', data.user)
				commit('SET_MENUS', data.menus)
				commit('SET_PERMISSIONS', data.permissions)
				setToken(data.token)
				//后端数据 add router
				if (!isEmpty((data.menus))) {
					router.addRoutes(convertRouters(data.menus))
				}
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	loadUserInfo({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			if (isEmpty(getToken())) reject('401')
			getInfo(state.token).then(response => {
				const {
					data
				} = response

				if (!data) {
					reject('Verification failed, please Login again.')
				}
				const {
					menus,
					permissions,
					user
				} = data
				// menus must be a non-empty array
				if (!menus || menus.length <= 0) {
					reject('menus must be a non-null array!')
				}
				commit('SET_MENUS', menus)
				commit('SET_PERMISSIONS', permissions)
				commit('SET_USER', user)
				resolve(data)
			}).catch(error => {
				reject(error)
			})
		})
	},

	updateUser({
		commit
	}, newData) {
		if (newData !== undefined && !isEmpty(newData) && isObject(newData) && !isEmpty(newData.user)) {
			const {
				menus,
				permissions,
				user
			} = newData
			commit('SET_MENUS', menus)
			commit('SET_PERMISSIONS', permissions)
			commit('SET_USER', user)
		}
	},

	updateToken({
		commit
	}, newToken) {
		if (!isEmpty(newToken)) {
			commit('SET_TOKEN', newToken)
		}
	},

	// user logout
	logout({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_MENUS', [])
				commit('SET_PERMISSIONS', [])
				removeToken()
				Cookies.remove('showIdentityMessagebox')
				resetRouter()
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_MENUS', [])
			commit('SET_PERMISSIONS', [])
			removeToken()
			resolve()
		})
	},

	getMerNo({
		commit
	}) {
		let user = commit('GET_USER')
		if (!isEmpty(user)) {
			return user.mer_no;
		} else {
			return ''
		}
	}

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
