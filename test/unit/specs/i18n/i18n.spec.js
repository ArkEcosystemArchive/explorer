import { mount } from '@vue/test-utils'
import i18n from '@/i18n'
import store from '@/store'

describe('i18n', () => {
  it('should return a translation for a given phrase', () => {
    expect(i18n.t('No Results')).toBe('No Results')
  })

  it('should be possible to switch languages', () => {
  	store.dispatch('ui/setLanguage', 'nl')
    expect(i18n.t('No Results')).toBe('Geen Resultaten')
    expect(store.getters['ui/language']).toBe('nl')
  })
})
