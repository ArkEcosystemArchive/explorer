import loaderService from '@/services/loader'
import store from '@/store'

describe('Loader Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
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
