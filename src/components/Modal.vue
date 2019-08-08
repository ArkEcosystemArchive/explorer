<template>
  <transition
    name="modal"
    appear
  >
    <div
      class="modal-mask"
      @click="$emit('close')"
    >
      <div class="flex items-center justify-center absolute inset-0">
        <div
          class="modal-container bg-theme-page-background text-theme-text-content rounded shadow-theme mx-auto relative p-10"
          @click.stop
        >
          <button
            class="absolute top-0 right-0 p-5"
            @click="$emit('close')"
          >
            <img src="@/assets/images/icons/cross.svg">
          </button>

          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  transition: all 0.3s ease;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
