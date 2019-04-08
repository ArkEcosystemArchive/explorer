import Vue from 'vue'
import moment from 'moment-timezone'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false
Vue.use(VTooltip, { defaultHtml: false })

moment.tz.setDefault('America/Los_Angeles')
