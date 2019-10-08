const Vue = require("vue");
const moment = require("moment-timezone");
const VTooltip = require("v-tooltip");

Vue.config.productionTip = false;
Vue.use(VTooltip, { defaultHtml: false });

moment.tz.setDefault("America/Los_Angeles");
