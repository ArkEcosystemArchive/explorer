<template>
  <button class="flex-none" @click="copy" v-tooltip="{ show: isMobileCopying, content: copying ? $t('Copied!') : $t('Copy to Clipboard'), trigger:'hover'}">
    <img :class="{
      'block': !copying, 'block animated wobble': copying
    }" src="@/assets/images/icons/copy.svg" ref="copyImage" />
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
    isMobileCopying: false
  }),

  methods: {
    copy() {
      let textArea = document.createElement('textarea')
      textArea.value = this.value
      textArea.style.cssText =
        'position:absolute;top:0;left:0;z-index:-9999;opacity:0;'

      document.body.appendChild(textArea)
      textArea.select()

      try {
        this.copying = true

        setTimeout(() => (this.copying = false), 500)

        if (window.innerWidth < 768) {
          this.isMobileCopying = true
          setTimeout(() => (this.isMobileCopying = false), 400) // If set to 500, it will briefly show 'Copy to clipboard' before closing tooltip
        }

        document.execCommand('copy')
      } catch (err) {
        console.error('Clipboard not supported!')
      }

      document.body.removeChild(textArea)
    },
  },
}
</script>
