import store from '@/store'
import emoji from 'node-emoji'

const locale = store.getters['ui/locale']

export default {
  methods: {
    truncate (value, length = 13, truncateWhere = 'middle') {
      switch (truncateWhere) {
        case 'left':
          return (value.length > length)
            ? `...${value.slice(value.length - length + 3)}`
            : value

        case 'middle':
          const odd = length % 2
          const truncationLength = Math.floor((length - 1) / 2)
          return (value.length > length)
            ? `${value.slice(0, truncationLength - odd)}...${value.slice(value.length - truncationLength + 1)}`
            : value

        case 'right':
          return (value.length > length)
            ? `${value.slice(0, length - 3)}...`
            : value

        default:
          return value
      }
    },

    capitalize (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    percentageString (value, decimals = 2) {
      if (typeof value !== 'undefined') {
        return (value / 100).toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          style: 'percent'
        })
      }

      return '-'
    },

    emojify (text) {
      return emoji.emojify(text)
    }
  }
}
