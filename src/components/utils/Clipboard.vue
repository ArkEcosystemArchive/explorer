<template>
  <button class="flex-none" @click="copy" v-tooltip="getTooltip()">
    <img class="block" :class="{ 'animated wobble': copying }" src="@/assets/images/icons/copy.svg" ref="copyImage" />
  </button>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    copying: false,
    notSupported: false
  }),

  methods: {
    getTooltip() {
      const tooltip = {
        content: this.$i18n.t('Copy to clipboard'),
        trigger: 'hover',
        show: this.copying,
        hideOnTargetClick: this.copying
      }

      if (this.copying) {
        tooltip.delay = { show: 0, hide: 1000 }

        if (this.notSupported) {
          tooltip.content = this.$i18n.t('Error!')
          tooltip.classes ='tooltip-bg-2'
        } else {
          tooltip.content = this.$i18n.t('Copied!')
          tooltip.classes ='tooltip-bg-0'
        }
      }

      return tooltip
    },

    copy() {
      let textArea = document.createElement('textarea')
      textArea.value = this.value
      textArea.style.cssText =
        'position:absolute;top:0;left:0;z-index:-9999;opacity:0;'

      document.body.appendChild(textArea)
      textArea.select()

      this.copying = true
      setTimeout(() => (this.copying = false), 1200)

      try {
        this.notSupported = false
        document.execCommand('copy')
      } catch (err) {
        this.notSupported = true
      }

      document.body.removeChild(textArea)
    },
  },
}
</script>
