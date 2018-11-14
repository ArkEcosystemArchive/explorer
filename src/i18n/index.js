import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

Vue.use(VueI18n)

const messages = {
  'en-gb': require('./en.json'),
  'en-us': require('./en.json'),
  nl: require('./nl.json'),
  'pt-br': require('./pt.json'),
  pl: require('./pl.json'),
  fr: require('./fr.json')
}

export default new VueI18n({
  locale: store.getters['ui/language'],
  messages
})
