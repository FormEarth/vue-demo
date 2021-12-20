import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en_us from './en-US'
import zh_cn from './zh-CN'

Vue.use(VueI18n)

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh-CN', // 设置地区
    messages: {
        "zh-CN": zh_cn,
        "en-US": en_us
    }, // 设置地区信息
})

export default i18n