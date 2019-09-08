import QRious from "qrious";

export default {
  name: "QrCode",

  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
    },
  },

  watch: {
    value() {
      this.generate();
    },

    options() {
      this.generate();
    },
  },

  mounted() {
    this.generate();
  },

  render(createElement) {
    return createElement("canvas", this.$slots.default);
  },

  methods: {
    generate() {
      /* eslint-disable no-new */
      new QRious(
        Object.assign(
          {
            element: this.$el,
            value: this.value,
          },
          this.options,
        ),
      );
    },
  },
};
