import Vue from 'vue'
import VueI18n from "vue-i18n";
import store from "@/store";
import {isEmpty} from "@/utils/validate";

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: (!isEmpty(store) && !isEmpty(store.getters)) ? store.getters.lang : 'zh',
    messages: {
        'zh': require('../assets/lang/zh'),
        'en': require('../assets/lang/en')
    }
})

export default i18n
