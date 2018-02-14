import store from '@/store'

describe('delegates store modules', () => {
  it('should set the delegates rate', () => {
    store.dispatch('delegates/setDelegates', ['fake-list'])

    expect(store.getters['delegates/delegates']).toEqual(['fake-list'])
  })

  it('should set the delegates rate', () => {
    store.dispatch('delegates/setForged', ['fake-list'])

    expect(store.getters['delegates/forged']).toEqual(['fake-list'])
  })
})
