<template>
  <button
    v-tooltip="getTooltip()"
    class="ClipboardButton"
    @click="copy"
  >
    <img
      ref="copyImage"
      :class="{ 'animated wobble': copying }"
      class="block"
      src="@/assets/images/icons/copy.svg"
    >
  </button>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Clipboard',

  props: {
    value: {
      type: String,
      required: true
    }
  },

  data: () => ({
    copying: false,
    notSupported: false
  }),

  methods: {
    getTooltip () {
      const tooltip = {
        content: this.$i18n.t('BUTTON_CLIPBOARD.COPY_TO_CLIPBOARD'),
        trigger: 'hover',
        show: this.copying,
        hideOnTargetClick: this.copying
      }

      if (this.copying) {
        tooltip.delay = { show: 0, hide: 1000 }

        if (this.notSupported) {
          tooltip.content = this.$i18n.t('BUTTON_CLIPBOARD.ERROR')
          tooltip.classes = 'tooltip-bg-2'
        } else {
          tooltip.content = this.$i18n.t('BUTTON_CLIPBOARD.SUCCESS')
          tooltip.classes = 'tooltip-bg-0'
        }
      }

      return tooltip
    },

    copy () {
      const textArea = document.createElement('textarea')
      textArea.value = this.value
      textArea.style.cssText =
        'position:absolute;top:0;left:0;z-index:-9999;opacity:0;'

      document.body.appendChild(textArea)

      const isiOSDevice = navigator.userAgent.match(/ipad|iphone/i)

      if (isiOSDevice) {
        const editable = textArea.contentEditable
        const readOnly = textArea.readOnly

        textArea.contentEditable = true
        textArea.readOnly = false

        const range = document.createRange()
        range.selectNodeContents(textArea)

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        textArea.setSelectionRange(0, 999999)
        textArea.contentEditable = editable
        textArea.readOnly = readOnly
      } else {
        textArea.select()
      }

      this.copying = true
      setTimeout(() => (this.copying = false), 1200)

      try {
        this.notSupported = false
        document.execCommand('copy')
      } catch (err) {
        this.notSupported = true
      }

      document.body.removeChild(textArea)
    }
  }
}
</script>

<style>
  .ClipboardButton {
    @apply .flex-none
  }
</style>
