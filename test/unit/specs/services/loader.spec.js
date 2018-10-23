import loaderService from '@/services/loader'
import store from '@/store'

describe('Loader Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://dexplorer.ark.io:8443/api/v2')
  })

  it('should return network settings', async () => {
    const data = await loaderService.config()
    expect(Object.keys(data).sort()).toEqual([
      'nethash',
      'token',
      'symbol',
      'explorer',
      'version'
    ].sort())
  })
})
