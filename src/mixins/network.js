import store from '@/store'

export default {
  methods: {
    networkToken () {
      return store.getters['network/token'] ||
        store.getters['network/defaults'].token ||
        ''
    }
  }
}
