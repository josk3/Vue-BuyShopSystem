import Vue from 'vue'
import VueI18n from "vue-i18n";
import store from "@/store";

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: store.getters.lang || 'zh',
    messages: {
        'zh': require('../assets/lang/zh'),
        'en': require('../assets/lang/en')
    }
})

export default i18n
