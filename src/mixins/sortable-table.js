export default {
  data: () => ({
    sortKey: null,
    sortDirection: 'desc'
  }),

  computed: {
    sortSymbol() {
      return require(`@/assets/images/arrows/${this.sortDirection}.svg`)
    }
  },

  methods: {
    sortBy(sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      this.sortKey = sortKey
    }
  }
}
