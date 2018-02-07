export default {
  data: () => ({
    sortKey: null,
    sortDirection: 'asc'
  }),

  methods: {
    sortBy(sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      this.sortKey = sortKey
    }
  }
}
