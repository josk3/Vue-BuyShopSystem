import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import App from './App.vue'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission' // permission control
import '@/utils/error-log' // error log
import * as filters from './filters' // global filters
//-
import 'bootstrap'
import '@/configs'

import i18n from "@/service/i18n";
//-
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faBars, faLanguage, faSignOutAlt, faUndo, faUnlockAlt} from '@fortawesome/free-solid-svg-icons'
import {faBell, faClipboard} from '@fortawesome/free-regular-svg-icons'
import '@/styles/index.scss' // global css
//-

library.add(faSignOutAlt, faLanguage, faBars, faUnlockAlt, faUndo)
library.add(faBell, faClipboard)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    //locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#portal',
    router,
    store,
    i18n,
    render: h => h(App)
})

