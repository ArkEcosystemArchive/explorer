import merge from "lodash/merge";

/* tslint:disable:no-var-requires */
const mixins = [
  require("./currency").default,
  require("./misc").default,
  require("./network").default,
  require("./strings").default,
];

export default merge([], ...mixins);
