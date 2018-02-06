import store from '@/store'

describe('delegates store modules', () => {
  it('should set the delegates rate', () => {
    store.dispatch('delegates/setDelegates', ['fake-list'])

    store.getters['delegates/delegates'].should.deep.equal(['fake-list'])
  })

  it('should set the delegates rate', () => {
    store.dispatch('delegates/setForged', ['fake-list'])

    store.getters['delegates/forged'].should.deep.equal(['fake-list'])
  })
})
