import { VueGoodTable } from 'vue-good-table'
import i18n from '@/i18n'

export default {
  name: 'TableWrapper',

  props: {
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    hasPagination: {
      type: Boolean,
      required: false,
      default: false
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    perPageDropdown: {
      type: Array,
      required: false,
      default: () => [10, 20, 30, 40, 50]
    },
    isRemote: {
      type: Boolean,
      required: false,
      default: false
    },
    sortQuery: {
      type: Object,
      required: false,
      default: () => ({})
    },
    noDataMessage: {
      type: String,
      required: false,
      default: i18n.t('COMMON.NO_RESULTS')
    }
  },

  render (h) {
    return h(VueGoodTable, {
      props: {
        mode: this.isRemote ? 'remote' : 'local',
        sortOptions: {
          enabled: !!this.sortQuery,
          initialSortBy: this.sortQuery
        },
        paginationOptions: {
          enabled: this.hasPagination,
          dropdownAllowAll: false,
          perPage: this.perPage,
          perPageDropdown: this.perPageDropdown,
          nextLabel: this.$t('PAGINATION.NEXT'),
          prevLabel: this.$t('PAGINATION.PREVIOUS'),
          rowsPerPageLabel: this.$t('PAGINATION.ROWS_PER_PAGE'),
          ofLabel: this.$t('PAGINATION.OF'),
          pageLabel: this.$t('PAGINATION.PAGE'),
          allLabel: this.$t('PAGINATION.ALL')
        },
        ...this.$attrs
      },
      scopedSlots: {
        'table-row': table => this.$scopedSlots.default({ ...table })
      },
      on: this.$listeners
    }, [
      h('div', {
        slot: 'emptystate',
        class: 'flex justify-center font-semibold'
      }, [
        h('span', {
          class: 'text-theme-page-text-light'
        },
        this.noDataMessage)
      ])
    ])
  }
}
