<template>
  <span v-tooltip="id">
    <router-link :to="{ name: 'transaction', params: { id } }" class="flex items-center whitespace-no-wrap">
      <span v-if="hasDefaultSlot"><slot></slot></span>
      <template v-else>
        <svg
         v-if="showSmartBridgeIcon && smartBridge"
         class="mr-2 fill-current hidden md:block"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="18px" height="18px">
        <path fill-rule="evenodd" fill="currentColor"
          d="M17.6,11.3c0.6-0.6,0.6-1.5,0-2l-6.7-6.5C10.6,2.4,10,2.2,9.6,2.2H5.5C4.7,2.3,3.9,2.9,3.9,3.8l0,0C3.8,3.8,3.6,3.9,3.4,4
          C2.5,4.3,1.6,5,0.9,5.5l0,0c-1,1-0.9,1.8-0.7,2.3c0.1,0.3,0.6,0.9,2,0.9c0.6,0,1.2-0.1,1.9-0.2c0,0.3,0.1,0.6,0.3,0.7l6.7,6.7
          c0.6,0.6,1.5,0.6,2,0L17.6,11.3z M8,6.1c-0.5,0.5-1.1,0.5-1.6,0c0,0,0,0-0.1-0.1c-0.5,0.3-1,0.7-1.6,0.9c-2,0.9-3.4,0.7-3.5,0.3
          c0-0.1,0-0.5,0.5-0.9l0,0c0.6-0.6,1.2-1,2.1-1.4h0.1v1.6c0.2-0.1,0.3-0.2,0.6-0.2c0.6-0.2,1.1-0.6,1.6-0.8c0-0.3,0.1-0.7,0.3-1
          c0.5-0.5,1.1-0.5,1.6,0C8.4,5,8.4,5.7,8,6.1z"/>
        </svg>
        <svg
         v-else-if="showSmartBridgeIcon && !smartBridge"
         class="mr-2 fill-current hidden md:block"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         width="18px" height="18px">
        <path fill-rule="evenodd" fill="currentColor"
          d="M17.6,9.4L11,2.7c-0.4-0.4-0.9-0.5-1.4-0.5h-4C4.7,2.3,4,2.9,4,3.7C3.9,3.8,3.7,3.9,3.4,4c-1,0.5-1.9,1-2.5,1.6
          c-1,1-0.9,1.8-0.7,2.2s0.6,1,2.1,1c0.5,0,1.3-0.1,1.9-0.3C4.2,8.7,4.4,9,4.6,9.1l6.7,6.8c0.5,0.5,1.4,0.5,2,0l4.4-4.5
          C18.2,10.8,18.2,9.9,17.6,9.4z M1.3,7.2c-0.1-0.1,0-0.5,0.5-0.9c0.5-0.5,1.3-1,2.2-1.4H4v1.6c0.2,0,0.4-0.1,0.5-0.2
          c0.5-0.2,1.1-0.5,1.5-0.8c0-0.4,0.1-0.7,0.4-1c0.5-0.5,1.2-0.5,1.6,0C8.5,5,8.5,5.7,8.2,6.1C7.7,6.5,7,6.5,6.6,6.1
          C6.5,6,6.5,6,6.5,6C6,6.3,5.5,6.6,4.8,6.9C2.8,7.7,1.4,7.4,1.3,7.2z M16.9,10.7l-4.4,4.5c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2,0-0.3-0.1
          L5.3,8.4C5.2,8.3,5.1,8.2,5,8.1L4.9,7.9c0.1,0,0.2-0.1,0.3-0.1C5.6,7.6,6,7.4,6.4,7.2C6.7,7.3,7,7.4,7.4,7.4c0.6,0,1.1-0.2,1.5-0.6
          C9.7,6,9.6,4.7,8.8,3.8C8.4,3.4,7.8,3.2,7.3,3.2c-0.6,0-1.1,0.2-1.5,0.6C5.5,4.1,5.3,4.5,5.2,4.9C5.1,5,5.1,5,5,5V3.7
          c0-0.3,0.3-0.5,0.6-0.5l3.9,0c0.3,0,0.6,0.1,0.7,0.2l6.7,6.7C17.1,10.3,17.1,10.5,16.9,10.7z"/>
        </svg>
        <span>{{ truncate(id) }}</span>
      </template>
    </router-link>
  </span>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    smartBridge: {
      type: String,
      required: false,
    },
    showSmartBridgeIcon: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    }
  },
}
</script>
