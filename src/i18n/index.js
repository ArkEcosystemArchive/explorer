import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

Vue.use(VueI18n)

const messages = {
  en: require('./en.json'),
  nl: require('./nl.json'),
  'pt-br': require('./pt-br.json'),
  pl: require('./pl.json')
}

export default new VueI18n({
  locale: store.getters['ui/language'],
  messages
})
