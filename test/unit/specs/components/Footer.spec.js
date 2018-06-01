import { shallowMount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Footer from '@/components/Footer'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()
localVue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': {} },
  silentTranslationWarn: true
})

global.GIT_VERSION = '43496685190e3e768c3f5b1bc322ff8b7ed4c696'
global.GIT_DATE = '2018-01-01'

describe('Footer', () => {
  it('uses the current year always', () => {
    const year = 1984

    // Sandboxing the global Date object avoids problems with other tests
    const sandbox = sinon.createSandbox({
      useFakeTimers: new Date(year, 1)
    })

    const cmp = shallowMount(Footer, {
      localVue,
      i18n
    })

    expect(cmp.vm.year).toEqual(year.toString())
    sandbox.restore()
  })
})
