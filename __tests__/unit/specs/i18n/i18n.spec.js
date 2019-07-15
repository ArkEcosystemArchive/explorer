import i18n from '@/i18n'

describe('i18n', () => {
  it('Should return a translation for a given phrase', () => {
    expect(i18n.t('No results')).toBe('No results')
    expect(i18n.t('Reward (token)', { token: 'ARK' })).toBe('Reward (ARK)')
  })

  it('Should be possible to switch languages', () => {
    expect(i18n.t('No results', 'nl')).toBe('Geen Resultaten')
    expect(i18n.t('No results', 'pt-br')).toBe('Sem resultados')
    expect(i18n.t('No results', 'pl')).toBe('Brak wyników')
    expect(i18n.t('No results', 'fr')).toBe('Pas de résultats')
    expect(i18n.t('No results', 'it-it')).toBe('Nessun risultato')
  })
})
