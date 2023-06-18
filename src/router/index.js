import { createRouter, createWebHashHistory } from 'vue-router'
import {i18n, SUPPORT_LOCALES, setI18nLanguage, loadLocaleMessages} from '@/i18n'
const {
    global: { locale },
} = i18n;
const NewCampaign = () => import(`@/views/NewCampaign.vue`);


const routes = [
    {
        path: '/',
        name: 'newcampaign',
        component: NewCampaign
    }

]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})


// locale
// navigation guards
router.beforeEach(async (to, from, next) => {
    // lấy tham số locale,từ query string
    var paramsLocale = to.params.locale || locale
    // Nếu locale không hỗ trợ thì lấy mặc định
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
        paramsLocale = locale
    }
    // load locale messages
    if (i18n.global.availableLocales.includes(paramsLocale)) {
        await loadLocaleMessages(i18n, paramsLocale)
    }
    // set i18n language
    setI18nLanguage(i18n, paramsLocale)

    return next()
})

export default router