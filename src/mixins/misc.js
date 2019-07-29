import moment from 'moment'
import store from '@/store'

const locale = store.getters['ui/locale']

export default {
  methods: {
    readableTimestamp (value) {
      return moment
        .unix(value)
        .local()
        .format('L LTS')
    },

    readableTimestampAgo (time, compareTime) {
      const momentTime = moment
        .unix(time)
        .local()
      return typeof compareTime !== 'undefined' ? momentTime.from(moment.unix(compareTime).local()) : momentTime.fromNow()
    },

    readableNumber (value, digits = 2, omitSeparator = false) {
      if (omitSeparator) {
        return value.toFixed(digits)
      }

      return value.toLocaleString(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
      })
    }
  }
}
