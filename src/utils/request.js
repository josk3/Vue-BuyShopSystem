import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken, getTokenKey, setToken} from '@/service/auth/token'
import configs from '@/configs'
import qs from "qs";
import {isEmpty, isObject} from "@/utils/validate";
import i18n from "@/service/i18n";
import {getSplitLast, toLower} from "@/utils/strUtils";

/**
 * https://github.com/axios/axios
 * axios封装的工具类，用于http 请求 post , get , delete 等网络请求
 * 统计处理 api url的前缀、header加token,language 、请求返回结果的错误码做相应处理
 */
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 15000 // request timeout 15s
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // 头部加token请求
            config.headers[getTokenKey()] = store.getters.token
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
                if (newToken !== getToken()) {
                    setToken(newToken);
                    store.dispatch('user/updateToken', newToken).then()
                } //new token
            }
            //文件下载
            if (response.headers['content-type'] === 'application/octet-stream') {
                return response;
            }
        }
        const res = response.data
        if (res.status !== 1) {
            if (res.code === configs.apiCode.needLogin) {
                tryReLogin(res)
            } else {
                if (!isEmpty(response.config.show_error_msg_dialog) &&
                    response.config.show_error_msg_dialog === true) {
                    let badMsg = (res.message || 'Error');
                    if (configs.apiCode.reqIsBad === res.code ) {
                        badMsg = badMsg + ' <small class="msg-req-id">' + res.request_id +'</small>'
                    }
                    Message({
                        dangerouslyUseHTMLString: true,
                        message: badMsg,
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
            }
            return Promise.reject(!isEmpty(res.code) ? res : new Error(res.message || 'Error'))
        } else {
            if (!isEmpty(res.code) && res.code === configs.apiCode.reloadUserData) {
                if (!isEmpty(res.user_info) && isObject(res.user_info)) {
                    store.dispatch('user/updateUser', res.user_info).then()
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
                        tryReLogin(res)
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

function tryReLogin(res) {
    let msg = i18n.t('comm.login_timeout').toString()
    if (!isEmpty(res) && !isEmpty(res.message)) {
        msg = res.message
    }
    MessageBox.confirm(msg,
        i18n.t('comm.login').toString(), {
            confirmButtonText: i18n.t('comm.re_login'),
            cancelButtonText: i18n.t('comm.cancel'),
            type: 'warning'
        }).then(() => {
        store.dispatch('user/resetToken').then(() => {
            //this.$router.push({name: 'login', params: {v: '1'}})
            //location.reload()
            location.href = configs.loginPath
        })
    })
}

export function postHandleError(url, params, timeout) {
    let req = {
        method: 'post',
        url: url,
        data: qs.stringify(params),
        show_error_msg_dialog: false, //如果请求返回status=0 是否显示错误信息弹框
    };
    if (!isEmpty(timeout)) req.timeout = timeout
    return service(req);
}

export function post(url, params) {
    return service({
        method: 'post',
        url: url,
        data: qs.stringify(params),
        show_error_msg_dialog: true,
    });
}

/**
 * 当有包含数组时
 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
 // 'a[0]=b&a[1]=c'
 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
 // 'a[]=b&a[]=c'
 qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
 // 'a=b&a=c'
 */
export function postArray(url, params) {
    return service({
        method: 'post',
        url: url,
        data: qs.stringify(params, {arrayFormat: 'brackets'}),
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

//通过 request payload 发送, application/json 使用 @RequestBody 接收
export function del(url, params) {
    return service({
        method: 'delete',
        url: url,
        data: params,
        show_error_msg_dialog: true,
    });
}

//通过 request payload 发送, application/json 使用 @RequestBody 接收
export function delHandleError(url, params) {
    return service({
        method: 'delete',
        url: url,
        data: params,
        show_error_msg_dialog: true,
    });
}

/**
 * 本地url, url不会加前缀
 */
export function localJson(url) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: url,
            dataType: "json",
            crossDomain: true,
            cache: false
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    });
}

/**
 * axios 上传文件
 * @param url url
 * @param formData 应该为  new FormData();  可包含表单的其他data参数
 *   let formData = new FormData();
 *   formData.append("username", "you-data-xxx");
 *   formData.append("key-xxx", "value-xxx");
 *   formData.append("file-key-name1", file-value1);
 *   formData.append("file-key-name2", file-value2);
 *   formData.append("files[]", file-value-list);
 *   .....表单请求参数
 * @param progressCallback (可以为空) 使做到进度条回调
 */
export function upload(url, formData, progressCallback) {
    return service({
        headers: {"Content-Type": "multipart/form-data"},
        method: 'post',
        url: url,
        data: formData,
        timeout: 45000,
        show_error_msg_dialog: true,
        onUploadProgress: e => {
            if (!isEmpty(progressCallback)) progressCallback(((e.loaded / e.total * 100) | 0))
        }
    });
}

/**
 * axios下载文件
 * @param url url
 * @param params
 * @param progressCallback (可以为空) 使做到进度条回调
 */
export function download(url, params, progressCallback) {
    return new Promise((resolve, reject) => {

        service({
            method: 'post',
            url: url,
            data: params,
            show_error_msg_dialog: true,
            timeout: 45000,
            responseType: 'blob',
            onDownloadProgress: e => {
                if (!isEmpty(progressCallback)) progressCallback(((e.loaded / e.total * 100) | 0))
            }
        })
            .then((res) => {
                const {data, headers} = res
                let fileName = headers['content-disposition']
                fileName = fileName.replace(/\w+; filename=(.*)/, '$1')
                fileName = fileName.replace(/\w+;filename=(.*)/, '$1')
                fileName = fileName.replace(/"/g, '')
                fileName = fileName.trim()
                const blob = new Blob([data], {type: headers['content-type']})
                //兼容IE解决办法
                if(window.navigator && window.navigator.msSaveOrOpenBlob){
                    navigator.msSaveBlob(blob, fileName);
                }else{
                    //其他浏览器
                    let dom = document.createElement('a')
                    let url = window.URL.createObjectURL(blob)
                    dom.href = url
                    dom.download = decodeURI(fileName)
                    dom.style.display = 'none'
                    document.body.appendChild(dom)
                    dom.click()
                    dom.parentNode.removeChild(dom)
                    window.URL.revokeObjectURL(url)
                }
                resolve(res);
            }).catch((err) => {
            reject(err)
        })
    })

}

export default service
