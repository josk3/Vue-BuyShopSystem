import Vue from 'vue'
import VueI18n from "vue-i18n";
import store from "@/store";
import {isEmpty} from "@/utils/validate";
import app from "@/store/modules/app";

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
        'zh': require('../assets/lang/zh'),
        'en': require('../assets/lang/en')
    }
})

export default i18n
