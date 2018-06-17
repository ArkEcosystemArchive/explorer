import i18n from '@/i18n'

describe('i18n', () => {
  it('should return a translation for a given phrase', () => {
    expect(i18n.t('No Results')).toBe('No Results')
  })

  it('should be possible to switch languages', () => {
    expect(i18n.t('No Results', 'nl')).toBe('Geen Resultaten')
    expect(i18n.t('No Results', 'pt')).toBe('Sem resultados')
  })
})
