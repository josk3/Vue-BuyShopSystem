import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken, getTokenKey, setToken} from '@/service/auth/token'
import configs from '@/configs'
import qs from "qs";
import {isEmpty} from "@/utils/validate";
import i18n from "@/service/i18n";
import {getSplitLast, toLower} from "@/utils/strUtils";

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout 5s
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // 头部加token请求
            config.headers[getTokenKey()] = getToken()
        }
        config.headers['Wp-Lang'] = store.getters.lang
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => { //200
        //response : data, status:200(http code), statusText:OK, headers:xx, config:xxx, request: xxx
        if (!isEmpty(response.headers)) {
            let headerToken = response.headers[toLower(getTokenKey())];
            if (!isEmpty(headerToken)) {
                let newToken = getSplitLast(headerToken)
                if (newToken !== getToken()) setToken(newToken); //new token
            }
        }
        const res = response.data
        if (res.status !== 1) {
            if (res.code === configs.apiCode.needLogin) {
                tryReLogin()
            } else {
                if (!isEmpty(response.config.show_error_msg_dialog) &&
                    response.config.show_error_msg_dialog === true) {
                    Message({
                        message: res.message || 'Error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            if (res.code === configs.apiCode.reloadUserData) {
                if (res.data.user !== undefined) {
                    store.dispatch('user/updateUser', res.data.user).then()
                }
            }
            return res
        }
    },
    error => {
        if (process.env.NODE_ENV === 'development') {
            console.log('err' + error) // for debug
        }
        let errMsg;
        if (!isEmpty(error.response)) {
            errMsg = error.response.message
            if (!isEmpty(error.response.data)) {
                let res = error.response.data;
                if (!isEmpty(res)) {
                    if (res.code === configs.apiCode.needLogin) {
                        tryReLogin()
                        return Promise.reject(error)
                    }
                }
            }
        }
        Message({
            message: errMsg ? errMsg : (error.message || 'Error'),
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

function tryReLogin() {
    MessageBox.confirm(i18n.t('comm.login_timeout').toString(),
        i18n.t('comm.logout').toString(), {
            confirmButtonText: i18n.t('comm.re_login'),
            cancelButtonText: i18n.t('comm.cancel'),
            type: 'warning'
        }).then(() => {
        store.dispatch('user/resetToken').then(() => {
            location.reload()
        })
    })
}

export function postHandleError(url, params) {
    return service({
        method: 'post',
        url: url,
        data: qs.stringify(params),
        show_error_msg_dialog: false, //如果请求返回status=0 是否显示错误信息弹框
    });
}

export function post(url, params) {
    return service({
        method: 'post',
        url: url,
        data: qs.stringify(params),
        show_error_msg_dialog: true,
    });
}

export function get(url, params) {
    return service({
        method: 'get',
        url: url,
        params: params,
        show_error_msg_dialog: true,
    });
}

export function getHandleError(url, params) {
    return service({
        method: 'get',
        url: url,
        params: params,
        show_error_msg_dialog: true,
    });
}


export default service
