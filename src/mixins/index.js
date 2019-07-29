import merge from 'lodash/merge'

const mixins = [
  require('./currency').default,
  require('./misc').default,
  require('./network').default,
  require('./strings').default
]

export default merge(...mixins)
