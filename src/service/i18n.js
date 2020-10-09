import Vue from 'vue'
import VueI18n from "vue-i18n";
import store from "@/store";
import {isEmpty} from "@/utils/validate";
import app from "@/store/modules/app";
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)
function getLang() {
    if (!isEmpty(store) && !isEmpty(store.getters)) {
        return store.getters.lang;
    }else if (!isEmpty(app) && !isEmpty(app.actions.getLang())){
        return app.actions.getLang();
    }else {
        return 'zh';
    }
}

const i18n = new VueI18n({
    locale: getLang(),
    messages: {
        'zh': Object.assign(require('../assets/lang/zh'), zhLocale),
        'en': Object.assign(require('../assets/lang/en'), enLocale),
    }
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
